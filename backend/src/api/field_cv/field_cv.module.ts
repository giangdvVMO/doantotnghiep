import { Module } from '@nestjs/common';
import { FieldCvService } from './field_cv.service';
import { FieldCvController } from './field_cv.controller';

@Module({
  controllers: [FieldCvController],
  providers: [FieldCvService]
})
export class FieldCvModule {}
