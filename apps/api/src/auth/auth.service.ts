import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,

        @Inject('jwt')
        private readonly jwtAccessService: JwtService,

        @Inject('jwt-refresh')
        private readonly jwtRefreshService: JwtService,

    ) { }


    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findAndValidate(email, password);
        return user;
    }

    login(payload: GenerateJwtPayload): LoginResTokens {

        return {
            access_token: this.jwtAccessService.sign(payload),
            refresh_token: this.jwtRefreshService.sign(payload),
            id: +payload.id

        };
    }


}

