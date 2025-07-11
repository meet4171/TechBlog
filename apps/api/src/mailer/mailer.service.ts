import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

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
        const html = `<div>
      <h2>Your OTP for BlogSpace</h2>
      <p><strong>${otp.otp}</strong></p>
      <p>This OTP will expire in 2 minutes.</p>
    </div>`;

        const mailOptions = {
            from: `"BlogSpace Support" <${this.configService.get<string>('EMAIL_USER')}>`,
            to: otp.email,
            subject: 'Your OTP Code for BlogSpace',
            text: `Your OTP code is: ${otp.otp}`,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('OTP email sent to', otp.email);
        } catch (error) {
            console.error('Failed to send OTP email:', error.response || error.message || error);
            throw new InternalServerErrorException('Failed to send OTP email');
        }
    }
}
