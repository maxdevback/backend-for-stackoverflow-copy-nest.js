import { Controller, Get, Post, Delete, Body, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IRequestWihUser } from 'src/types';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() data: CreatePostDto, @Req() req: IRequestWihUser) {
    const dataWithUserId = { ...data, user_id: req.user.id };
    return this.postService.create(dataWithUserId);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }
  @Get()
  getByTag() {
    //
  }

  @Get(':postId')
  getById() {
    //return this.postService.findOne(+id);
  }

  @Delete(':postId')
  remove() {
    // return this.postService.remove(+id);
  }
}
