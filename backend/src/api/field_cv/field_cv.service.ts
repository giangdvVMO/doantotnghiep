import { Injectable } from '@nestjs/common';
import { CreateFieldCvDto } from './dto/create-field_cv.dto';
import { UpdateFieldCvDto } from './dto/update-field_cv.dto';

@Injectable()
export class FieldCvService {
  create(createFieldCvDto: CreateFieldCvDto) {
    return 'This action adds a new fieldCv';
  }

  findAll() {
    return `This action returns all fieldCv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fieldCv`;
  }

  update(id: number, updateFieldCvDto: UpdateFieldCvDto) {
    return `This action updates a #${id} fieldCv`;
  }

  remove(id: number) {
    return `This action removes a #${id} fieldCv`;
  }
}
