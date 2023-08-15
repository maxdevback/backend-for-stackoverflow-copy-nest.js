import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { IRequestWihUser } from 'src/types';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() data: CreatePostDto, @Req() req: IRequestWihUser) {
    console.log(req.user);
    const dataWithUserId = { ...data, user_id: req.user.id };
    return this.postService.create(dataWithUserId);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }
  @Get('/tag/:tagname')
  getByTag(@Param('tagname') tagname: string) {
    return this.postService.getByTag(tagname);
  }

  @Get(':postId')
  async getById(@Param('postId') postId: number) {
    return await this.postService.getById(postId);
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: number, @Req() req: IRequestWihUser) {
    console.log(req.user);
    return await this.postService.delete(postId, req.user.id);
  }
}
