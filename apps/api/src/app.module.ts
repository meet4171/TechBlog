import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, PostModule, CommentModule, LikesModule, UserModule, TagsModule, AuthModule, ConfigModule.forRoot({
    envFilePath: ['../.env'],
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
