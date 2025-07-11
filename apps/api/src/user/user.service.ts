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


    async signup(userDto: CreateUserDto): Promise<User> {

        const existingUser = await this.findByEmail(userDto.email);
        if (existingUser) {
            throw new ConflictException('User Already Exists ');
        }

        const userData = { ...userDto, role: ROLES.USER };

        const user = await this.prismaService.user.create({ data: userData });

        if (!user) {
            throw new BadRequestException('User not created');
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return user;
    }

    async updateRefreshTokenById(userId: number, refreshToken: string) {
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
