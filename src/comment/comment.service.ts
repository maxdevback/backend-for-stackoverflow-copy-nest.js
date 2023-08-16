import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  async create(data: CreateCommentDto & { user_id: number; post_id: number }) {
    const comment = new Comment();
    comment.user = await this.userService.getById(data.user_id);
    comment.post = await this.postService.getById(data.post_id);
    comment.body = data.body;
    return await this.commentRepository.save(comment);
  }

  async getByPostId(postId: number) {
    return await this.commentRepository.find({
      where: { post: { id: postId } },
    });
  }

  async deleteById(commentId: number, authId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (!comment)
      throw new HttpException(
        'The comment with that id dose not exist',
        HttpStatus.NOT_FOUND,
      );
    if (authId !== comment.user.id)
      throw new HttpException("You're not a owner", HttpStatus.FORBIDDEN);
    delete comment.user.password;
    await this.commentRepository.delete({ id: comment.id });
    return comment;
  }
}
