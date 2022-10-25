import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { StudentModule } from './api/student/student.module';
import { CompanyModule } from './api/company/company.module';
import { ManufactureModule } from './api/manufacture/manufacture.module';
import { ManuCompanyModule } from './api/manu-company/manu-company.module';
import { RecruitModule } from './api/recruit/recruit.module';
import { FieldModule } from './api/field/field.module';
import { FieldRecruitModule } from './api/field-recruit/field-recruit.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/assignment'),
    StudentModule,
    CompanyModule,
    ManufactureModule,
    ManuCompanyModule,
    RecruitModule,
    FieldModule,
    FieldRecruitModule,
  ],
})
export class AppModule {}
