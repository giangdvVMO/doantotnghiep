import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLetterDto {
  @ApiProperty({
    description: 'id_account',
  })
  @IsNotEmpty()
  id_account: number;

  @ApiProperty({
    description: 'content',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty()
  title: string;
}
