import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';

import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { RegisterDto } from '../auth/dto/register.dto';
import { SALT_ROUNDS } from 'src/configs/constant.config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(createUserDto: RegisterDto): Promise<any> {
    console.log(createUserDto);
    //create id
    const count: any = await this.userModel.aggregate([
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
    const id = count.length ? count[0].max + 1 : 1;
    const userDocument: any = {
      ...createUserDto,
      birthday: new Date(createUserDto.birthday),
      _id: id,
    };
    //check unique
    const existUser = await this.userModel.aggregate([
      {
        $match: {
          $or: [
            { email: createUserDto.email },
            { username: createUserDto.username },
          ],
        },
      },
    ]);
    if (existUser.length) {
      throw new BadRequestException('Account exist');
    }
    userDocument.password = bcrypt.hashSync(userDocument.password, SALT_ROUNDS);
    const user = await this.userModel.create(userDocument);
    // if(user){
    //   return true;
    // }
    // return false;
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByCondition(condition: any) {
    const user = await this.userModel.find(condition).exec();
    return user[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userModel.updateOne();
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
