import { Module } from '@nestjs/common';
import { NotiService } from './noti.service';
import { NotiController } from './noti.controller';

@Module({
  controllers: [NotiController],
  providers: [NotiService]
})
export class NotiModule {}
