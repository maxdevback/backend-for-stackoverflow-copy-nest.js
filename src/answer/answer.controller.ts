import { Controller, Get, Post, Delete } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Controller('posts/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('postId')
  create() {
    // return this.answerService.create(createAnswerDto);
  }

  @Get(':postId')
  findOne() {
    //return this.answerService.findOne(+id);
  }

  @Delete(':answerId')
  remove() {
    // return this.answerService.remove(+id);
  }
}
