import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotiService } from './noti.service';
import { CreateNotiDto } from './dto/create-noti.dto';
import { UpdateNotiDto } from './dto/update-noti.dto';

@Controller('noti')
export class NotiController {
  constructor(private readonly notiService: NotiService) {}

  @Post()
  create(@Body() createNotiDto: CreateNotiDto) {
    return this.notiService.create(createNotiDto);
  }

  @Get()
  findAll() {
    return this.notiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotiDto: UpdateNotiDto) {
    return this.notiService.update(+id, updateNotiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notiService.remove(+id);
  }
}
