import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DateToShortString } from 'src/share/external-services/parseDateToString';
import { ManuCompanyService } from '../manu-company/manu-company.service';
import { Company, CompanyDocument } from './company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { QueryParamCompanyDto } from './dto/query-param-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly manuCompanyService: ManuCompanyService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const result = await this.companyModel.create(createCompanyDto);
    return result;
  }

  async findAll(query: QueryParamCompanyDto) {
    const { scaleBound, status, search } = query;
    const condition = {};
    console.log('search', search);
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search ? search : '');
    let min = 0;
    let max = 1000000;
    if (scaleBound) {
      const minmax = scaleBound.split('-');
      console.log('minmax', minmax);
      if (minmax.length === 1) {
        min = +minmax[0].split(' ')[1];
      } else {
        min = +minmax[0];
        max = +minmax[1];
      }
    }
    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }

    const companyList = await this.companyModel.aggregate([
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
                  input: '$website',
                  regex: searchRgx,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$com_name',
                  regex: searchRgx,
                  options: 'i',
                },
              },
              {
                $regexMatch: {
                  input: '$address',
                  regex: searchRgx,
                  options: 'i',
                },
              },
            ],
          },
          minmax: {
            $and: [{ $gte: ['$scale', min] }, { $lt: ['$scale', max] }],
          },
        },
      },
      {
        $match: {
          result: true,
          minmax: true,
        },
      },
      {
        $lookup: {
          from: 'tbl_manu_company',
          localField: '_id',
          foreignField: 'id_company',
          as: 'manu_company',
        },
      },
      {
        $unwind: '$manu_company',
      },
      {
        $lookup: {
          from: 'tbl_manufacture',
          localField: 'manu_company.id_manu',
          foreignField: '_id',
          as: 'manufacture',
        },
      },
      {
        $unwind: '$manufacture',
      },
    ]);
    if (companyList.length) {
      const dataList = { ...companyList[0] };
      const list = companyList.map((company) => {
        return company.manufacture;
      });
      return {
        data: { ...dataList, manufacture: list },
      };
    }
    return { data: companyList };
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

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const {
      com_name,
      address,
      year,
      com_phone,
      com_email,
      website,
      scale,
      introduction,
      manufacture,
      update_id,
    } = { ...updateCompanyDto };
    const updateCompany = await this.companyModel.updateOne(
      { _id: id },
      {
        com_name,
        address,
        year,
        com_phone,
        com_email,
        website,
        scale,
        introduction,
        update_id,
        update_date: new Date(),
      },
    );

    const dataUpdateManu = {
      id_company: id,
      id_manu_array: manufacture,
    };
    const updateManu = await this.manuCompanyService.create(dataUpdateManu);
    if ((updateCompany && updateManu) || updateCompany.modifiedCount) {
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
    return `This action removes a #${id} company`;
  }
}
