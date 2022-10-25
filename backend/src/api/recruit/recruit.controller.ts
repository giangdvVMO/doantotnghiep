import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruitService } from './recruit.service';
import { CreateRecruitDto } from './dto/create-recruit.dto';
import { UpdateRecruitDto } from './dto/update-recruit.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('recruit')
@ApiTags('Recruit')
export class RecruitController {
  constructor(private readonly recruitService: RecruitService) {}

  @Post()
  create(@Body() createRecruitDto: CreateRecruitDto) {
    console.log(createRecruitDto);
    return this.recruitService.create(createRecruitDto);
  }

  @Get()
  findAll() {
    return this.recruitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecruitDto: UpdateRecruitDto) {
    return this.recruitService.update(+id, updateRecruitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruitService.remove(+id);
  }
}
