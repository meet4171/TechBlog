import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PostsService {
    constructor(private readonly prismaService: PrismaService) { }

    async createPost(dto: CreatePostDto) {

        try {
            return await this.prismaService.post.create({
                data: {
                    slug: dto.slug,
                    title: dto.title,
                    content: dto.content,
                    thumbnail: dto.thumbnail,
                    published: dto.published,
                    authorId: dto.authorId,
                },
            });

        } catch (error) {
            // Handle Prisma known errors
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Unique constraint failed
                    throw new BadRequestException('A post with this slug already exists.');
                }
                // Add more Prisma error codes as needed
            }

            console.error('Unexpected error while creating post:', error);
            throw new InternalServerErrorException('Failed to create post');
        }

    }
}

