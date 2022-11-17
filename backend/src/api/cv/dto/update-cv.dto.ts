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
  status: string;

  @ApiPropertyOptional({
    description: 'fields',
  })
  @IsOptional()
  @IsNotEmpty()
  // @IsArray()
  fields: string;

  @ApiPropertyOptional({
    description: 'id_student',
  })
  @IsOptional()
  @IsNotEmpty()
  id_student: string;

  @ApiProperty({
    description: 'update_id',
  })
  @IsOptional()
  @IsNotEmpty()
  update_id: string;
}

export class FileUpdateCVDto extends UpdateCvDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  file_cv: any;
}
