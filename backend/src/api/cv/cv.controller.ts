import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { QueryParamCVDto } from './dto/query-param-cv.dto';
import { UpdateFullCVDto } from './dto/update-cv.dto';

@Controller({
  version: ['1'],
  path: 'cv',
})
@ApiTags('CV')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  // @UseInterceptors(FileInterceptor('file_cv'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   description: 'create CV',
  //   type: FileCreateCVDto,
  // })
  create(
    @Body() createCvDto: CreateCvDto,
    // @UploadedFile() file_cv: Express.Multer.File,
  ) {
    const { file_cv } = createCvDto;
    return this.cvService.create(createCvDto, file_cv);
  }

  @Get()
  findAll(@Query() query: QueryParamCVDto) {
    return this.cvService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateFullCVDto) {
    return this.cvService.updateOne(+id, updateCvDto);
  }
}
