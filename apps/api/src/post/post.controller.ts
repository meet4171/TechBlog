import { Body, Controller, Post, Get, Put, Delete } from '@nestjs/common';
import { PostsService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  getAllPosts() {

  }
  @Get('/:slug')
  getPost() {

  }
  @Post()
  createPost() {

  }
  @Put('/:id')
  editPost() {

  }
  @Delete('/:id')
  deletePost() {

  }




}
