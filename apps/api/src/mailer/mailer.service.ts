import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { NotFoundError } from 'rxjs';


@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: Number(this.configService.get<string>('EMAIL_PORT')),
            secure: this.configService.get<string>('EMAIL_SECURE') === 'true',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
        });

        // Optional: Verify connection configuration
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('Mail transporter setup failed:', error);
            } else {
                console.log('Mail transporter is ready');
            }
        });
    }

    async sendOtpEmail(otp: SendOtp): Promise<void> {


        const expireTime = this.configService.get<string>('OTP_EXPIRE_TIME') || '300000';
        const expireTimeMin = Number(expireTime) / 60000;

        const htmlPath = path.join(process.cwd(), 'src', 'mailer', 'otp-email.template.html');
        const htmlTemplate = fs.readFileSync(htmlPath, 'utf-8');

        const compiledHtml = htmlTemplate
            .replace('{{otpCode}}', otp.otp)
            .replace('{{expireTime}}', expireTimeMin.toString());

        const mailOptions = {
            from: `"BlogSpace Support" <${this.configService.get<string>('EMAIL_USER')}>`,
            to: otp.email,
            subject: 'Your OTP Code for BlogSpace',
            html: compiledHtml,
        };

        try {
            await this.transporter.sendMail(mailOptions);

        } catch (error) {
            console.error('Failed to send OTP email:', error.response || error.message || error);
            throw new InternalServerErrorException('Failed to send OTP email');
        }
    }
}
