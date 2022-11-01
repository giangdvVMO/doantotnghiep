import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'id_field_array',
  })
  @IsNotEmpty()
  id_field_array: number[];
}

export class FileCreateCVDto extends CreateCvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file_cv: any;
}
