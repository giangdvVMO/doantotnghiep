import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { LetterStudentService } from './letter_student.service';
import { CreateLetterStudentDto } from './dto/create-letter_student.dto';
import { UpdateLetterStudentDto } from './dto/update-letter_student.dto';

@Controller('letter-student')
export class LetterStudentController {
  constructor(private readonly letterStudentService: LetterStudentService) {}

  @Post()
  create(@Body() createLetterStudentDto: CreateLetterStudentDto) {
    return this.letterStudentService.create(createLetterStudentDto);
  }

  @Get()
  findAll() {
    return this.letterStudentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!parseInt(id)) {
      throw new BadRequestException('id không hợp lệ');
    }
    return this.letterStudentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLetterStudentDto: UpdateLetterStudentDto,
  ) {
    if (!parseInt(id)) {
      throw new BadRequestException('id không hợp lệ');
    }
    return this.letterStudentService.update(+id, updateLetterStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!parseInt(id)) {
      throw new BadRequestException('id không hợp lệ');
    }
    return this.letterStudentService.remove(+id);
  }
}
