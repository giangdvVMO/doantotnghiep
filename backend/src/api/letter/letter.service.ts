import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { Letter, LetterDocument } from './letter.schema';

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(Letter.name)
    private readonly letterModel: Model<LetterDocument>,
  ) {}
  async calculateId() {
    //create id
    const count: any = await this.letterModel.aggregate([
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
  async create(createLetterDto: CreateLetterDto) {
    const _id = await this.calculateId();
    console.log('_id', _id);
    const result = await this.letterModel.create({
      ...createLetterDto,
      _id: _id,
      create_date: new Date(),
    });
    return result;
  }

  findAll() {
    return `This action returns all letter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letter`;
  }

  update(id: number, updateLetterDto: UpdateLetterDto) {
    return `This action updates a #${id} letter`;
  }

  remove(id: number) {
    return `This action removes a #${id} letter`;
  }
}
