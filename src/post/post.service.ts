import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(data: CreatePostDto & { user_id: number }) {
    const tags = data.tagName.split(',');
    console.log(tags);
    const tagsEnts = tags.map((tag) =>
      this.tagRepository.create({ name: tag }),
    );
    console.log(tagsEnts);
    await this.tagRepository.save(tagsEnts);
    delete data.tagName;
    return await this.postRepository.insert(data);
  }

  async getAll() {
    return await this.postRepository.find();
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
