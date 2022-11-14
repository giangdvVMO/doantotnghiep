import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @ApiPropertyOptional({
    description: 'status',
  })
  @IsOptional()
  @IsNotEmpty()
  status: boolean;

  @ApiProperty({
    description: 'fields',
  })
  @IsNotEmpty()
  fields: number[];

  @ApiProperty({
    description: 'file_cv',
  })
  @IsNotEmpty()
  file_cv: string;
}

export class FileCreateCVDto extends CreateCvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file_cv: any;
}
