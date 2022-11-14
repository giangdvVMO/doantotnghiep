import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCvDto {
  @ApiPropertyOptional({
    description: 'title',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'status',
  })
  @IsOptional()
  @IsNotEmpty()
  status: boolean;

  @ApiPropertyOptional({
    description: 'fields',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  fields: number[];

  @ApiPropertyOptional({
    description: 'id_student',
  })
  @IsOptional()
  @IsNotEmpty()
  id_student: number;

  @ApiProperty({
    description: 'update_id',
  })
  @IsNotEmpty()
  update_id: number;

  @ApiProperty({
    description: 'file_cv',
  })
  @IsNotEmpty()
  file_cv: string;
}

export class UpdateFullCVDto extends UpdateCvDto {}
