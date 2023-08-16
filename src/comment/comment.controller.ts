import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Param,
  Body,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IRequestWihUser } from 'src/types';

@Controller('/posts/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  async createByPostId(
    @Param('postId') postId: number,
    @Body() data: CreateCommentDto,
    @Req() req: IRequestWihUser,
  ) {
    return await this.commentService.create({
      ...data,
      user_id: +req.user.id,
      post_id: +postId,
    });
  }

  @Get(':postId')
  async getCommentsByPostId(@Param('postId') postId: number) {
    return await this.commentService.getByPostId(postId);
  }

  @Delete(':commentId')
  async deleteById(
    @Param('commentId') commentId: number,
    @Req() req: IRequestWihUser,
  ) {
    return await this.commentService.deleteById(commentId, req.user.id);
  }
}
