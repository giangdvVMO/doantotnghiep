import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateCvDto {
  @ApiPropertyOptional({
    description: 'title',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s]{1,50}$/,
    {
      message: 'title không chứa các ký tự đặc biệt',
    },
  )
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
