import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCvDto {
  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'id_sv',
  })
  @IsNotEmpty()
  id_student: number;
}

export class CreateCvApiDto extends CreateCvDto {}
