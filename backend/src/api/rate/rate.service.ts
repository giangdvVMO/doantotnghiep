import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApplyService } from '../apply/apply.service';
import { LetterService } from '../letter/letter.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { Rate, RateDocument } from './rate.schema';

@Injectable()
export class RateService {
  constructor(
    @InjectModel(Rate.name) private readonly rateModel: Model<RateDocument>,
    private readonly applyService: ApplyService,
    private readonly letterService: LetterService,
  ) {}
  create(createRateDto: CreateRateDto) {
    return 'This action adds a new rate';
  }

  async findPreCondition(id_student: number, id_company: number) {
    const apply = await this.applyService.findCondition({
      id_student,
      id_company,
    });
    const letter = await this.letterService.findCondition({
      id_student,
      id_company,
    });
    if (apply.data.length && letter.data.length) {
      return { data: true };
    }
    return { data: false };
  }

  findAll() {
    return `This action returns all rate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rate`;
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return `This action updates a #${id} rate`;
  }

  remove(id: number) {
    return `This action removes a #${id} rate`;
  }
}
