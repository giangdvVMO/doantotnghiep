import { Injectable } from '@nestjs/common';
import { CreateAccountNotiDto } from './dto/create-account_noti.dto';
import { UpdateAccountNotiDto } from './dto/update-account_noti.dto';

@Injectable()
export class AccountNotiService {
  create(createAccountNotiDto: CreateAccountNotiDto) {
    return 'This action adds a new accountNoti';
  }

  findAll() {
    return `This action returns all accountNoti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountNoti`;
  }

  update(id: number, updateAccountNotiDto: UpdateAccountNotiDto) {
    return `This action updates a #${id} accountNoti`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountNoti`;
  }
}
