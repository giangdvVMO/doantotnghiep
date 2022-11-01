import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CvService } from './cv.service';
import { CreateCvDto, FileCreateCVDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller({
  version: ['1'],
  path: 'cv',
})
@ApiTags('CV')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file_cv'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'create CV',
    type: FileCreateCVDto,
  })
  create(
    @Body() createCvDto: CreateCvDto,
    @UploadedFile() file_cv: Express.Multer.File,
  ) {
    return this.cvService.create(createCvDto, file_cv);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }
}
