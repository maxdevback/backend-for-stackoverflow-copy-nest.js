import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll() {
    // return this.tagService.findAll();
  }

  @Get(':tagname')
  findOne() {
    // return this.tagService.findOne(+id);
  }
}
