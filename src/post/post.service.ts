import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}
  async create(data: CreatePostDto & { user_id: number }) {
    const post = new Post();
    post.user = await this.userService.getById(data.user_id);
    post.body = data.body;
    post.title = data.title;
    const postInserted = await this.postRepository.save(post);
    return await this.tagService.addTags(data.tagName, postInserted.id);
  }
  async getAll() {
    return await this.postRepository.find();
  }
  async getByTag(tagname: string) {
    const postsIds: any[] = await this.tagService.getByTagName(tagname);
    return this.postRepository.find({
      where: { id: In(postsIds.map((postId) => postId.post_id)) },
    });
  }
  async getById(postId: number) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post)
      throw new HttpException(
        'The post with that id dose not found',
        HttpStatus.NOT_FOUND,
      );
    return post;
  }

  async delete(postId: number, authId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!post)
      throw new HttpException(
        'The post with that id dose not exist',
        HttpStatus.NOT_FOUND,
      );
    if (post.user.id !== authId)
      throw new HttpException(
        "You're not a author of this post",
        HttpStatus.NOT_FOUND,
      );
    await this.tagService.delete(postId);
    return await this.postRepository.delete({ id: postId });
  }
}
