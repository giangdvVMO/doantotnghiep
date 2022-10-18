import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDtox {
  @ApiPropertyOptional({
    description: 'name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'status',
  })
  @IsOptional()
  @IsIn([1, 0])
  status: number;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'username',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  username: string;

  @ApiPropertyOptional({
    description: 'email',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({
    description: 'fullname',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  fullname: string;

  @ApiPropertyOptional({
    description: 'birthday',
  })
  @IsOptional()
  @IsDateString()
  @MaxLength(100)
  birthday: string;

  @ApiPropertyOptional({
    description: 'phone',
  })
  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(100)
  phone: string;
}

export class ChangeUserPasswordDto {
  @ApiProperty({
    description: 'old password',
    example: '12345a',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'new password',
    example: '12345ab',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    description: 'confirm password',
    example: '12345ab',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}

export class UpdateInforUser {
  @ApiPropertyOptional({
    description: 'first_name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  first_name: string;

  @ApiPropertyOptional({
    description: 'last_name',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  last_name: string;

  @ApiPropertyOptional({
    description: 'phone',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({
    description: 'start_date',
  })
  @IsOptional()
  @IsDateString()
  start_date: string;

  @ApiPropertyOptional({
    description: 'gender',
  })
  @IsOptional()
  gender: number;

  @ApiPropertyOptional({
    description: 'birthday',
  })
  @IsOptional()
  @IsDateString()
  birthday: string;
}

export class FileUploadDto extends UpdateInforUser {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image: any;
}
