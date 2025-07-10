
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';


export const getJwtAccessConfig = (configService: ConfigService): JwtModuleOptions => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRE_TIME') || '15m',
    },
});


export const getJwtRefreshConfig = (configService: ConfigService): JwtModuleOptions => ({
    secret: configService.get<string>('JWT_REFRESH_SECRET'),
    signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRE_TIME_REFRESH') || '7d',
    },
});