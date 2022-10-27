import { Module } from '@nestjs/common';
import { AccountNotiService } from './account_noti.service';
import { AccountNotiController } from './account_noti.controller';

@Module({
  controllers: [AccountNotiController],
  providers: [AccountNotiService]
})
export class AccountNotiModule {}
