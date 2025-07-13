
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(configService: ConfigService) {

        const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request): string | null => {
                    return req?.cookies?.refresh_token || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,

        });
    }

    validate(payload: any) {

        return {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
    }
}
