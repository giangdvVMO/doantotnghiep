import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApplyService } from './apply.service';
import { ConditionDto, CreateApplyDto } from './dto/create-apply.dto';

@Controller({
  version: ['1'],
  path: 'apply',
})
@ApiTags('Apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  create(@Body() createApplyDto: CreateApplyDto) {
    return this.applyService.create(createApplyDto);
  }

  @Get('')
  findOne(@Query() createApplyDto: CreateApplyDto) {
    return this.applyService.findOne(createApplyDto);
  }

  @Get('condition')
  findCondition(@Query() conditionDto: ConditionDto) {
    return this.applyService.findCondition(conditionDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.applyService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applyService.remove(+id);
  }
}
