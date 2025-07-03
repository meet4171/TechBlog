import { Controller, Get, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }


  @Get('posts/:postId/likes')
  getAllLikes() { }

  @Post('posts/:postId/like')
  toggleLike() { }
}
