import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtAccessConfig, getJwtRefreshConfig } from 'src/auth/config/jwt.config';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { JwtRefreshStrategy } from 'src/auth/strategy/jwt-refresh.strategy';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, PrismaService, JwtStrategy, JwtRefreshStrategy,
    {
      provide: 'jwt',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = getJwtAccessConfig(configService);
        return new JwtService(options);
      },
    },
    {
      provide: 'jwt-refresh',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = getJwtRefreshConfig(configService);
        return new JwtService(options);
      },
    },
  ],
})
export class AuthModule { }
