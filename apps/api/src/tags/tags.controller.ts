import { Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }


  @Get()
  getAllTags() { }

  // admin api
  @Post()
  createNewTag() { }
}
