import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { User } from '@prisma/client'; // ✅ Type-only import
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ROLES } from 'src/enum/Roles.enum';

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

    async updateRefreshTokenByUserId(userId: number, refreshToken: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId }
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        try {

            await this.prismaService.user.update({
                where: { id: userId },
                data: { refreshToken },
            });

        } catch (error) {
            throw new InternalServerErrorException("Error to Update RefreshToken");

        }

    }
}
