import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateToShortString } from 'src/share/external-services/parseDateToString';
import { ConfirmStudentDto } from './dto/confirm-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { QueryParamStudentDto } from './dto/student-params.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const result = await this.studentModel.create(createStudentDto);
    return result;
  }

  async findAll(query: QueryParamStudentDto) {
    const { university, major, status, search } = query;
    const condition = {};
    let searchCondition = {};
    if (search) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      searchCondition = {
        $addFields: {
          result: {
            $or: [
              {
                $regexMatch: {
                  input: '$account.fullname',
                  regex: searchRgx,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$university',
                  regex: searchRgx,
                  options: 'i',
                },
              },
            ],
          },
        },
      };
    }
    university ? (condition['university'] = university) : null;
    major ? (condition['major'] = major) : null;
    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }
    if (search) {
      condition[''];
    }

    const studentList = await this.studentModel.aggregate([
      {
        $lookup: {
          from: 'tbl_account',
          localField: 'id_account',
          foreignField: '_id',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
      {
        $match: {
          'account.delete_date': null,
          ...condition,
        },
      },
      ...searchCondition,
    ]);
    if (studentList.length) {
      const list = studentList.map((student) => {
        return {
          ...student,
          email: student.account.email,
          fullname: student.account.fullname,
          birthday: DateToShortString(student.account.birthday),
          phone: student.account.phone,
        };
      });
      return {
        data: list,
      };
    }
    return { data: studentList };
  }

  async findOne(id: number) {
    const student = await this.studentModel.findOne({ id_account: id });
    if (!student) {
      return { data: 'empty' };
    }
    return { data: student };
  }

  async findOneAndAccount(id: number) {
    const student = await this.studentModel.findOne({ id_account: id });
    if (!student) {
      return { data: 'empty' };
    }
    return student;
  }
  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const result = await this.studentModel.updateOne(
      { _id: id },
      { ...updateStudentDto, status: false, update_date: new Date() },
    );
    if (result.modifiedCount) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  async confirm(id: number, confirmDto: ConfirmStudentDto) {
    const result = await this.studentModel.updateOne(
      { _id: id },
      { ...confirmDto, confirm_date: new Date() },
    );
    if (result.modifiedCount) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
