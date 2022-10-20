import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ConfirmStudentDto } from './dto/confirm-student.dto';
import { QueryParamStudentDto } from './dto/student-params.dto';

@Controller({
  version: ['1'],
  path: 'student',
})
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(@Query() query: QueryParamStudentDto) {
    return this.studentService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Get('company/:id')
  findOneAndAccount(@Param('id') id: string) {
    return this.studentService.findOneAndAccount(+id);
  }

  @Patch('confirm/:id')
  confirm(@Param() id: string, @Body() confirmDto: ConfirmStudentDto) {
    return this.studentService.confirm(+id, confirmDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    console.log('id', id);
    console.log('updateStudentDto', updateStudentDto);
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
