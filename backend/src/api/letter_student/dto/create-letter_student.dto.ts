import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateLetterStudentDto {
  @ApiProperty({
    description: 'id_letter',
  })
  @IsNotEmpty()
  id_letter: number;

  @ApiProperty({
    description: 'id_student',
  })
  @IsNotEmpty()
  @IsArray()
  students: number[];
}
