import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }


  @Get('posts/:postId/comments')
  getAllComments() { }

  @Post('posts/:postId/comments')
  postComment() { }


  // admin apis

  @Put('posts/:postId/comments/:id')
  editComment() { }

  @Delete('posts/:postId/comments/:id')
  deleteComments() { }

}
