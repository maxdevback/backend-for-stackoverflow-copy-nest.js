import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAll() {
    return await this.tagService.getAll();
  }

  @Get(':tagname')
  getByName(@Param('tagname') tagname: string) {
    return this.tagService.getByTagName(tagname);
  }
}
