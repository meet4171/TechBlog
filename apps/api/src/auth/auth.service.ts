import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { hashTokenGenerator } from 'src/utils/helper.function';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,

        @Inject('jwt')
        private readonly jwtAccessService: JwtService,

        @Inject('jwt-refresh')
        private readonly jwtRefreshService: JwtService,

    ) { }


    async validateUser(email: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException("user not found");
        return user;
    }

    async login(payload: GenerateJwtPayload): Promise<LoginResTokens> {


        const access_token = this.jwtAccessService.sign(payload);
        const refresh_token = this.jwtRefreshService.sign(payload);

        const hashed_refresh_token = await hashTokenGenerator(refresh_token)
        await this.userService.updateRefreshTokenById(payload.id, hashed_refresh_token);

        return {
            id: payload.id,
            access_token,
            refresh_token: hashed_refresh_token,
        };

    }


}

