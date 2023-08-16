import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  async create(data: CreateAnswerDto & { postId: number; authId: number }) {
    const answer = new Answer();
    answer.body = data.body;
    answer.user = await this.userService.getById(data.authId);
    answer.post = await this.postService.getById(data.postId);
    return await this.answerRepository.save(answer);
  }

  async getByPostId(postId: number) {
    return await this.answerRepository.find({
      where: { post: { id: postId } },
    });
  }

  async deleteById(answerId: number, authId: number) {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
      relations: ['user'],
    });
    if (!answer) {
      throw new HttpException(
        'The answer with that dose not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    if (answer.user.id !== authId) {
      throw new HttpException(
        "You're not a owner of this answer",
        HttpStatus.FORBIDDEN,
      );
    }
    delete answer.user.password;
    await this.answerRepository.delete({ id: answer.id });
    return answer;
  }
}
