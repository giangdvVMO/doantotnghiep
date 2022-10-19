import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    const studentList = await this.studentModel.find();
    return studentList;
  }

  async findOne(id: number) {
    const student = await this.studentModel.findOne({ id_account: id });
    if (!student) {
      return { data: 'empty' };
    }
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
