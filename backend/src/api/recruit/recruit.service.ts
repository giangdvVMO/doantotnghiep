import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FieldRecruitService } from '../field-recruit/field-recruit.service';
import { ConfirmRecruitDto } from './dto/confirm-recruit.dto';
import { CreateRecruitDto } from './dto/create-recruit.dto';
import { QueryParamRecruitDto } from './dto/query-recruit.dto';
import { UpdateRecruitDto } from './dto/update-recruit.dto';
import { Recruit, RecruitDocument } from './recruit.schema';

@Injectable()
export class RecruitService {
  constructor(
    @InjectModel(Recruit.name)
    private readonly recruitModel: Model<RecruitDocument>,
    private readonly fieldRecruitService: FieldRecruitService,
  ) {}
  async calculateId() {
    //create id
    const count: any = await this.recruitModel.aggregate([
      {
        $group: {
          _id: null,
          max: {
            $max: '$_id',
          },
        },
      },
    ]);
    console.log(count);
    return count.length ? count[0].max + 1 : 1;
  }
  async create(createRecruitDto: CreateRecruitDto) {
    const _id = await this.calculateId();
    console.log('_id', _id);
    const result = await this.recruitModel.create({
      ...createRecruitDto,
      _id: _id,
      create_date: new Date(),
    });
    const createFieldRecruitDto = {
      id_recruit: _id,
      id_field_array: createRecruitDto.fields,
    };
    const createField = await this.fieldRecruitService.createMany(
      createFieldRecruitDto,
    );
    return result;
  }

  // async findAll() {
  //   const data = this.calculateId();
  //   //const data = await this.recruitModel.aggregate();
  //   return { data: data };
  // }

  async findOne(id: number) {
    const data = await this.recruitModel.aggregate();
    return { data: data };
  }

  async update(id: number, updateRecruitDto: UpdateRecruitDto) {
    const result = await this.recruitModel.updateOne();
    // const createField = await this.fieldRecruitService.createMany(
    //   // updateRecruitDto,
    // );
    return `This action updates a #${id} recruit`;
  }

  async remove(id: number) {
    const delete_date = new Date();
    const result = await this.recruitModel.updateOne(
      { _id: id },
      { delete_date },
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

  async confirm(id: number, confirmDto: ConfirmRecruitDto) {
    const result = await this.recruitModel.updateOne(
      { _id: id },
      { ...confirmDto, confirm_date: new Date(), status: true },
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

  async findAll(query: QueryParamRecruitDto) {
    const { field, status, search } = query;
    const condition = {};
    console.log('search', search);
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search ? search : '');
    if (status === '1') {
      condition['status'] = true;
    }
    if (status === '0') {
      condition['status'] = false;
    }
    const fields = field.map((item) => {
      return +item;
    });
    const field_condition = field ? { $in: [fields, '$id_field'] } : true;
    const companyList = await this.recruitModel.aggregate([
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
      {
        $group: {
          _id: '$_id',
          com_name: { $first: '$com_name' },
          address: { $first: '$address' },
          year: { $first: '$year' },
          com_phone: { $first: '$com_phone' },
          com_email: { $first: '$com_email' },
          website: { $first: '$website' },
          status: { $first: '$status' },
          scale: { $first: '$scale' },
          introduction: { $first: '$introduction' },
          id_account: { $first: '$id_account' },
          create_date: { $first: '$create_date' },
          update_date: { $first: '$update_date' },
          confirm_date: { $first: '$confirm_date' },
          manufactures: {
            $push: '$manufacture',
          },
          manu_id: {
            $push: '$manufacture._id',
          },
        },
      },
    ]);
    return { data: companyList };
  }
}
