import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateToShortString } from 'src/share/external-services/parseDateToString';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { QueryParamCompanyDto } from './dto/query-param-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const result = await this.companyModel.create(createCompanyDto);
    return result;
  }

  async findAll(query: QueryParamCompanyDto) {
    const { university, major, status, search } = query;
    const condition = {};
    console.log('search', search);
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search ? search : '');

    university ? (condition['university'] = university) : null;
    major ? (condition['major'] = major) : null;
    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }

    const studentList = await this.companyModel.aggregate([
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
      {
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
      },
      {
        $match: {
          result: true,
        },
      },
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

  async findOneAdmin(id: number) {
    const company = await this.companyModel.aggregate([
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
          _id: id,
        },
      },
    ]);
    if (company.length) {
      const fullcompany = {
        ...company[0],
        email: company[0].account.email,
        fullname: company[0].account.fullname,
        birthday: company[0].account.birthday,
        phone: company[0].account.phone,
      };
      return {
        data: fullcompany,
      };
    }
    return {
      data: 'empty',
    };
  }

  async findOne(id: number) {
    const company = await this.companyModel.findOne({ id_account: id });
    if (!company) {
      return { data: 'empty' };
    }
    return { data: company };
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
