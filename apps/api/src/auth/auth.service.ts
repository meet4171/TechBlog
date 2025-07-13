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

    private getCookieOptions(): CookieOptions {
        const cookieExpire = Number(this.configService.get<string>('COOKIE_EXPIRE_TIME'));
        const NODE_ENV = this.configService.get<string>('NODE_ENV');

        return {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/',
            maxAge: cookieExpire,
        };
    }

    async validateUser(email: string): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        return user;
    }

    async signup(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto.email);
        if (user) throw new InternalServerErrorException('User Already Exists');
        await this.otpService.sendOtp(userDto.email);

    }

    async login(email: string): Promise<void> {
        const user = await this.validateUser(email);
        if (!user) throw new NotFoundException('User with this email does not exists');
        await this.otpService.sendOtp(email);

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



    async verifyOtpAndSignupUser(userData: CreateUserDto, otp: string, res: Response): Promise<AuthResponse> {


        const isValid = await this.otpService.verifyOtp({ email: userData.email, otp });
        if (!isValid) throw new BadRequestException('Invalid or expired OTP');


        const user = await this.prisma.user.create({ data: userData });
        if (!user) throw new InternalServerErrorException('User Not Created');

        const payload = payloadExtractor(user);
        const tokens = await this.responseTokenGenerator(payload);

        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptions());

        return { id: tokens.id, access_token: tokens.access_token };
    }


    async verifyOtpAndLoginUser(email: string, otp: string, res: Response): Promise<AuthResponse> {


        const isValid = await this.otpService.verifyOtp({ email, otp });
        if (!isValid) throw new BadRequestException('Invalid or expired OTP');

        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        const payload = payloadExtractor(user);
        const tokens = await this.responseTokenGenerator(payload);

        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptions());

        return { id: tokens.id, access_token: tokens.access_token };
    }




    async refresh(payload: GenerateJwtPayload, token: string, res: Response) {
        const user = await this.userService.findById(payload.id);
        if (!user) throw new NotFoundException("user not found");

        if (!user.refreshToken) throw new NotFoundException("refresh token not found");

        const valid_user = await validateArgonToken(user.refreshToken, token);
        if (!valid_user) throw new UnauthorizedException("You are not authorized for new tokens");

        const tokens = await this.responseTokenGenerator(payload);
        res.cookie('refresh_token', tokens.refresh_token, this.getCookieOptions());
        return { id: tokens.id, access_token: tokens.access_token };

    }

}

