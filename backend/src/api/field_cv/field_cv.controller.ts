import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldCvService } from './field_cv.service';
import { CreateFieldCvDto } from './dto/create-field_cv.dto';
import { UpdateFieldCvDto } from './dto/update-field_cv.dto';

@Controller('field-cv')
export class FieldCvController {
  constructor(private readonly fieldCvService: FieldCvService) {}

  @Post()
  create(@Body() createFieldCvDto: CreateFieldCvDto) {
    return this.fieldCvService.create(createFieldCvDto);
  }

  @Get()
  findAll() {
    return this.fieldCvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldCvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldCvDto: UpdateFieldCvDto) {
    return this.fieldCvService.update(+id, updateFieldCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldCvService.remove(+id);
  }
}
