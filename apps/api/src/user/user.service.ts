import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }



    async findById(id: number): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({ where: { id } });
        return user;
    }


    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return user;
    }

    async updateRefreshTokenByUserId(id: number, refreshToken: string | null) {
        const user = await this.prismaService.user.findUnique({
            where: { id }
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        try {

            await this.prismaService.user.update({
                where: { id },
                data: { refreshToken },
            });

        } catch (error) {
            throw new InternalServerErrorException("Error to Update RefreshToken");

        }

    }
}
