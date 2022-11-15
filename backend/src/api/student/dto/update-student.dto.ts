import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    description: 'address',
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s\,]{1,50}$/,
    {
      message: 'địa chỉ không chứa các kí tự đặc biệt, không vượt quá 50 kí tự',
    },
  )
  address: string;

  @ApiPropertyOptional({
    description: 'cccd',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{9}|[0-9]{12}$/, {
    message: 'cccd chỉ chứa 9 hoặc 12 kí tự số',
  })
  cccd: string;

  @ApiPropertyOptional({
    description: 'university',
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s]{1,50}$/,
    {
      message: 'university không chứa các kí tự đặc biệt',
    },
  )
  university: string;

  @ApiPropertyOptional({
    description: 'faculty',
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s]{1,50}$/,
    {
      message: 'falculty không chứa các ký tự đặc biệt',
    },
  )
  faculty: string;

  @ApiPropertyOptional({
    description: 'major',
  })
  @IsOptional()
  @IsString()
  @Matches(
    /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9\s]{1,50}$/,
    {
      message: 'major không chứa các ký tự đặc biệt',
    },
  )
  major: string;

  @ApiPropertyOptional({
    description: 'status',
  })
  @IsOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional({
    description: 'course',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[1-9]{1}[0-9]{3}\-[1-9]{1}[0-9]{3}$/, {
    message: 'Định dạng của course năm-năm',
  })
  course: string;

  @ApiPropertyOptional({
    description: 'gpa',
  })
  @IsOptional()
  @Min(0.0)
  @Max(4.0)
  gpa: number;

  @ApiPropertyOptional({
    description: 'card_student',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9]{1,50}$/, {
    message:
      'mã số thẻ sinh viên không chứa các ký tự đặc biệt hoặc khoảng trống',
  })
  card_student: string;

  @ApiPropertyOptional({
    description: 'update_id',
  })
  @IsOptional()
  @IsNumber()
  update_id: number;
}

// export class ConfirmStudentDto {
//   @ApiPropertyOptional({
//     description: '_id',
//   })
//   @IsOptional()
//   _id: number;

//   @ApiPropertyOptional({
//     description: 'id_account',
//   })
//   @IsOptional()
//   id_account: number;

//   @ApiPropertyOptional({
//     description: 'confirm_id',
//   })
//   @IsOptional()
//   confirm_id: number;
// }
