import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RoleEnum, StatusEnum } from 'src/share/common/enum';
import { maxLengthPhone } from 'src/share/common/constanst';

export type UserDocument = User & Document;

@Schema({
  collection: 'tbl_user',
})
export class User {
  @Prop()
  _id: number;

  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, required: true })
  birthday: Date;

  @Prop({ type: String, enum: RoleEnum, required: true })
  role: string;

  @Prop({ type: String, enum: StatusEnum, default: StatusEnum.inActive })
  status: boolean;

  @Prop({ type: String, maxlength: maxLengthPhone })
  phone: string;

  @Prop({
    type: Number,
    ref: 'tbl_company',
    nullable: true,
    default: null
  })
  idCompany: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.index({ email: 1, username: 1 }, { unique: true });
