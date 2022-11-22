import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apply, ApplyDocument } from './apply.schema';
import { ConditionDto, CreateApplyDto } from './dto/create-apply.dto';

@Injectable()
export class ApplyService {
  constructor(
    @InjectModel(Apply.name)
    private readonly applyModel: Model<ApplyDocument>,
  ) {}
  async create(apply: any) {
    const exist = (await this.findOne(apply)).data.length;
    if (exist) {
      throw new BadRequestException('Đã có bản ghi');
    }
    const result = await this.applyModel.create(apply);
    return { data: result };
  }

  async findOne(createApplyDto: CreateApplyDto) {
    const result = await this.applyModel.aggregate([
      {
        $match: {
          id_student: +createApplyDto.id_student,
          id_recruit: +createApplyDto.id_recruit,
        },
      },
    ]);
    return { data: result };
  }

  async findCondition(conditionDto: ConditionDto) {
    const result = await this.applyModel.aggregate([
      {
        $match: {
          id_student: +conditionDto.id_student,
        },
      },
      {
        $lookup: {
          from: 'tbl_recruit',
          localField: 'id_recruit',
          foreignField: '_id',
          as: 'recruit',
        },
      },
      {
        $unwind: '$recruit',
      },
      {
        $match: {
          'recruit.id_company': +conditionDto.id_company,
        },
      },
    ]);
    return { data: result };
  }

  findAll(id: number) {
    return `This action returns all apply`;
  }

  remove(id: number) {
    return `This action removes a #${id} apply`;
  }
}
