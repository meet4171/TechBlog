import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { generate_jwt_payload, login_res_tokens } from 'types/type';

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

    login(user: User): login_res_tokens {

        if (!user) throw new NotFoundException('User Not Found!');
        const payload: generate_jwt_payload = { id: user.id, email: user.email, role: user.role };

        return {
            access_token: this.jwtAccessService.sign(payload),
            refresh_token: this.jwtRefreshService.sign(payload),
            id: user.id

        };
    }
}

