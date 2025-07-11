import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon2 from 'argon2';
import { Cron, CronExpression } from "@nestjs/schedule";
import { MailService } from "src/mailer/mailer.service";

@Injectable()
export class OtpService {
    private readonly logger = new Logger(OtpService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly mailService: MailService

    ) { }





    async sendOtp(email: string): Promise<void> {

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

        const hashedOtp = await argon2.hash(otp);

        const otp_created = await this.prisma.otp.create({
            data: { email, code: hashedOtp, expiresAt },
        });
        if (!otp_created) throw new InternalServerErrorException('Error in generating OTP');

        await this.mailService.sendOtpEmail({ email, otp });


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
        if (!authorized_user) new UnauthorizedException('User is not Authorized');

        const now = new Date();
        if (latestOtp.expiresAt < now) {
            throw new BadRequestException('OTP has expired');
        }

        await this.prisma.otp.delete({ where: { id: latestOtp.id } });

        return true;
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