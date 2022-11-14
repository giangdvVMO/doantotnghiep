import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDateString,
  IsEnum,
  IsPhoneNumber,
  maxLength,
  Length,
  Matches,
} from 'class-validator';
import { maxLengthPhone } from 'src/share/common/constanst';
import { RoleEnum } from 'src/share/common/enum';

export class RegisterDto {
  @ApiProperty({
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\ \,]{1}$/, {
    message: 'username không chứa kí tự đặc biệt',
  })
  username: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{1}$/, {
    message: 'password ',
  })
  password: string;

  @ApiProperty({
    description: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'fullname',
  })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'birthday',
  })
  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthday: string;

  @ApiProperty({
    description: 'phone',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;

  @ApiProperty({
    description: 'role',
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: string;
}
