import { Body, Controller, Post, Get, Put, Delete, } from '@nestjs/common';
import { PostsService } from './post.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';

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
  async createPost(
    @Body() body: CreatePostDto,
  ) {
    const post = await this.postsService.createPost(body);
    return {
      message: 'post created successfully',
      post
    }
  }


  @Put('/:id')
  editPost() {

  }
  @Delete('/:id')
  deletePost() {

  }




}
