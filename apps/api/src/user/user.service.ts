import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import {  User } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Roles } from 'src/enum/Roles.enum';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAndValidate(email: string, password: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async signup(userDto: CreateUserDto): Promise<User> {
        const existingUser = await this.findByEmail(userDto.email, false);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const hashPasswrod = await argon2.hash(userDto.password);
        const hashPassUser = { ...userDto, role: Roles.USER, password: hashPasswrod };
        const user = await this.prismaService.user.create({ data: hashPassUser });
        if (!user) {
            throw new BadRequestException('User not created');
        }

        return user;
    }

    async findByEmail(email: string, throwIfNotFound = true): Promise<User | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (!user && throwIfNotFound) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
