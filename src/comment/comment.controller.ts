import { Controller, Get, Post, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('/posts/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  createByPostId() {
    // return this.commentService.create(createCommentDto);
  }

  @Get(':postId')
  getCommentsByPostId() {
    // return this.commentService.findAll();
  }

  @Delete(':commentId')
  deleteById() {
    //return this.commentService.remove(+id);
  }
}
