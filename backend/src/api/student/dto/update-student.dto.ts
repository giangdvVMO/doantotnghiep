import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'username',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  username: string;
}
