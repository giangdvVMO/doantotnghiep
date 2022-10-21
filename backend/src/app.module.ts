import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { StudentModule } from './api/student/student.module';
import { CompanyModule } from './api/company/company.module';
import { ManufactureModule } from './api/manufacture/manufacture.module';
import { ManuCompanyModule } from './api/manu-company/manu-company.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/assignment'),
    StudentModule,
    CompanyModule,
    ManufactureModule,
    ManuCompanyModule,
  ],
})
export class AppModule {}
