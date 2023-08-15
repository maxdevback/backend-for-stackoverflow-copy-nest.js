import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { IRequestWihUser } from 'src/types';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('posts/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post(':postId')
  async create(
    @Param('postId') postId: number,
    @Body() data: CreateAnswerDto,
    @Req() req: IRequestWihUser,
  ) {
    return await this.answerService.create({
      ...data,
      post_id: +postId,
      user_id: +req.user.id,
    });
  }

  @Get(':postId')
  async findOne(@Param('postId') postId: number) {
    return await this.answerService.getByPostId(postId);
  }

  @Delete(':answerId')
  remove() {
    // return this.answerService.remove(+id);
  }
}
