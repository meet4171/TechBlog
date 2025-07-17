import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { hashTokenGenerator, payloadExtractor, validateArgonToken } from 'src/utils/helper.function';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly otpService: OtpService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,

        @Inject('jwt')
        private readonly jwtAccessService: JwtService,

        @Inject('jwt-refresh')
        private readonly jwtRefreshService: JwtService,

    ) { }

    private getCookieOptionsRefreshToken(): CookieOptions {
        const cookieExpire = Number(this.configService.get<string>('COOKIE_EXPIRE_TIME_REFRESH'));
        const NODE_ENV = this.configService.get<string>('NODE_ENV');

        return {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: cookieExpire,
        };
    }

    private getCookieOptionsAccessToken(): CookieOptions {
        const cookieExpire = Number(this.configService.get<string>('COOKIE_EXPIRE_TIME_ACCESS'));
        const NODE_ENV = this.configService.get<string>('NODE_ENV');

        return {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: cookieExpire,
        };


    }

    async validateUser(email: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        return user;
    }

    async signup(email: string): Promise<MailSent> {
        const otp_expire_in = Number(this.configService.get<string>('OTP_EXPIRE_TIME')) || 300000;
        if (!otp_expire_in) throw new NotFoundException("otp expire time not found in .env");

        const user = await this.validateUser(email);
        if (user) throw new InternalServerErrorException('User Already Exists');
        await this.otpService.sendOtp(email);
        const mail_sent_obj = { expiresAt: +otp_expire_in, message: 'Check mail for the OTP' }
        return mail_sent_obj


    }

    async signOut(userId: number, res: Response) {
        const NODE_ENV = this.configService.get<string>('NODE_ENV');
        await this.userService.updateRefreshTokenByUserId(userId, null);

        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return { message: 'Signed out successfully' };
    }

    async login(email: string): Promise<MailSent> {

        const otp_expire_in = Number(this.configService.get<string>('OTP_EXPIRE_TIME')) || 300000;
        if (!otp_expire_in) throw new NotFoundException("otp expire time not found in .env");

        const user = await this.validateUser(email);
        if (!user) throw new NotFoundException('User with this email does not exists');
        await this.otpService.sendOtp(email);
        const mail_sent_obj = { expiresAt: +otp_expire_in, message: 'Check mail for the OTP' }
        return mail_sent_obj

    }

    async responseTokenGenerator(payload: GenerateJwtPayload): Promise<LoginResTokens> {
        const access_token = this.jwtAccessService.sign(payload);
        const refresh_token = this.jwtRefreshService.sign(payload);

        const hashed_refresh_token = await hashTokenGenerator(refresh_token);
        await this.userService.updateRefreshTokenByUserId(payload.id, hashed_refresh_token);

        return {
            id: payload.id,
            access_token,
            refresh_token
        }

    }



    async verifyOtpAndSignupUser(userData: CreateUserDto, otp: string, res: Response): Promise<GenerateJwtPayload> {


        const isValid = await this.otpService.verifyOtp({ email: userData.email, otp });
        if (!isValid) throw new BadRequestException('Expired OTP');


        const user = await this.prisma.user.create({ data: userData });
        if (!user) throw new InternalServerErrorException('User Not Created');

        const payload = payloadExtractor(user);
        const tokens = await this.responseTokenGenerator(payload);

        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptionsRefreshToken());
        res.cookie('access_token', tokens.access_token, this.getCookieOptionsAccessToken());

        return payload;



    }


    async verifyOtpAndLoginUser(email: string, otp: string, res: Response): Promise<GenerateJwtPayload> {


        const isValid = await this.otpService.verifyOtp({ email, otp });
        if (!isValid) throw new BadRequestException('Expired OTP');

        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException('Expired OTP');

        const payload = payloadExtractor(user);
        const tokens = await this.responseTokenGenerator(payload);

        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptionsRefreshToken());
        res.cookie('access_token', tokens.access_token, this.getCookieOptionsAccessToken());

        return payload;


    }




    async refresh(payload: GenerateJwtPayload, token: string, res: Response) {
        const user = await this.userService.findById(payload.id);
        if (!user) throw new NotFoundException("user not found");

        if (!user.refreshToken) throw new NotFoundException("refresh token not found");

        const valid_user = await validateArgonToken(user.refreshToken, token);
        if (!valid_user) throw new UnauthorizedException("You are not authorized for new tokens");

        const tokens = await this.responseTokenGenerator(payload);
        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptionsRefreshToken());
        res.cookie('access_token', tokens.access_token, this.getCookieOptionsAccessToken());

    }


    async googleUser(createUser: CreateUserDto, res: Response): Promise<void> {
        let user = await this.validateUser(createUser.email);

        if (!user) {
            user = await this.prisma.user.create({ data: createUser });
            if (!user) throw new InternalServerErrorException('User not created');
        }

        const payload = payloadExtractor(user);
        const tokens = await this.responseTokenGenerator(payload);
        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptionsRefreshToken());
        res.cookie('access_token', tokens.access_token, this.getCookieOptionsAccessToken());
    }

    async validateGoogleToken(google_token: { refresh_token: string, id: number }): Promise<boolean> {

        const user = await this.userService.findById(google_token.id);
        if (!user || !user?.refreshToken) return false;

        const valid_token = await validateArgonToken(user.refreshToken, google_token.refresh_token);
        return valid_token;
    }


    async sendCurrentUser(user: GenerateJwtPayload): Promise<GenerateJwtPayload> {
        const requiredUser = await this.userService.findById(user.id);
        if (!requiredUser) throw new NotFoundException("user does not exists");
        return user;

    }
}

