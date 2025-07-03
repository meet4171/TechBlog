import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsService } from 'src/post/post.service';

@Module({
  controllers: [PostController],
  providers: [PostsService, PrismaService],
})
export class PostModule { }
