import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEnum,
  Length,
  Matches,
} from 'class-validator';
import { RoleEnum } from 'src/share/common/enum';

export class RegisterDto {
  @ApiProperty({
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{1,50}$/, {
    message: 'username không chứa kí tự đặc biệt và khoảng trống',
  })
  username: string;

  @ApiProperty({
    description: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{1,100}$/, {
    message: 'password không chỉ chứa kí tự chữ và số',
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
  @Matches(/^[a-zA-Z\s]{1,50}$/, {
    message: 'fullname không chứa kí tự đặc biệt',
  })
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
  @Matches(/^0{1}[1-9]{1}[0-9]{8}$/, {
    message: 'Chưa đúng định dạng số điện thoại: 10 kí tự số',
  })
  phone: string;

  @ApiProperty({
    description: 'role',
  })
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  role: string;
}
