import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from 'argon2';
import { Cron, CronExpression } from "@nestjs/schedule";
import { MailService } from "src/mailer/mailer.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class OtpService {
    private readonly logger = new Logger(OtpService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService

    ) { }



    async sendOtp(email: string): Promise<void> {

        const otp_expire_in = Number(this.configService.get<string>('OTP_EXPIRE_TIME')) || 300000;


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + otp_expire_in);

        await this.prisma.otp.deleteMany({
            where: { email }
        });
        const hashedOtp = await argon2.hash(otp);

        try {
            const otp_created = await this.prisma.otp.create({
                data: { email, code: hashedOtp, expiresAt },
            });

            await this.mailService.sendOtpEmail({ email, otp });

        } catch (error) {
            this.logger.error(`Error in sendOtp for ${email}`, error.stack);
            throw new InternalServerErrorException('Error in generating OTP');
        }
    }

    async verifyOtp(otp_data: SendOtp): Promise<boolean> {


        const latestOtp = await this.prisma.otp.findFirst({
            where: { email: otp_data.email },
            orderBy: { createdAt: 'desc' },
        });

        if (!latestOtp) {
            throw new BadRequestException('No OTP found for this email');
        }

        const authorized_user = await argon2.verify(latestOtp.code, otp_data.otp);
        if (!authorized_user) throw new UnauthorizedException('Invalid OTP');


        const now = new Date();
        if (latestOtp.expiresAt < now) {
            await this.prisma.otp.delete({ where: { id: latestOtp.id } });
            throw new BadRequestException('OTP has expired. Please request a new one.');
        }

        try {
            const isOtpValid = await argon2.verify(latestOtp.code, otp_data.otp);
            if (!isOtpValid) {
                throw new UnauthorizedException('Invalid OTP');
            }

            await this.prisma.otp.delete({ where: { id: latestOtp.id } });
            return true;
        } catch (error) {
            this.logger.error(`Error verifying OTP for ${otp_data.email}`, error.stack);
            throw new InternalServerErrorException('Error verifying OTP');
        }
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    async deleteExpiredOtps() {
        const now = new Date();
        const { count } = await this.prisma.otp.deleteMany({
            where: {
                expiresAt: { lt: now },
            },
        });
        if (count > 0) {
            this.logger.log(`Deleted ${count} expired OTPs.`);
        }
    }
}