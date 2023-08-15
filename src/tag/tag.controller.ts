import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAll() {
    return this.tagService.getAll();
  }

  @Get(':tagname')
  findByName() {
    // return this.tagService.findOne(+id);
  }
}
