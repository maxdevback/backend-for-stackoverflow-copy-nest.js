import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  async getAll() {
    return { data: await this.postService.getAll() };
  }
  @Get('/tag/:tagname')
  getByTag(@Param('tagname') tagname: string) {
    return this.postService.getByTag(tagname);
  }

  @Get(':postId')
  async getById(@Param('postId') postId: number) {
    if (Number.isNaN(+postId))
      throw new HttpException('Invalid path', HttpStatus.NOT_FOUND);
    return await this.postService.getById(postId);
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: number, @Req() req: IRequestWihUser) {
    return await this.postService.delete(postId, req.user.id);
  }
}
