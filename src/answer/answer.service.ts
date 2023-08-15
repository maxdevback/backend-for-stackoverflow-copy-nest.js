import { Injectable } from '@nestjs/common';
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
  async create(data: CreateAnswerDto & { post_id: number; user_id: number }) {
    const answer = new Answer();
    answer.body = data.body;
    answer.user = await this.userService.findOne(data.user_id);
    answer.post = await this.postService.getById(data.post_id);
    return await this.answerRepository.save(answer);
  }

  async getByPostId(postId: number) {
    console.log(postId);
    return await this.answerRepository.query(
      'SELECT * FROM answer WHERE post_id = $1',
      [postId],
    );
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
