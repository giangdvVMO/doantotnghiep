import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DeleteCvDto {
  @ApiProperty({
    description: 'delete_id',
  })
  @IsNotEmpty()
  @IsString()
  delete_id: string;
}