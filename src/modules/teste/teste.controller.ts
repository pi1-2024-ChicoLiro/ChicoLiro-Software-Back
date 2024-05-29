import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TesteService } from './teste.service';

@Controller('api/teste')
@ApiTags('teste')
export class TesteController {
  constructor(private readonly testeService: TesteService) {}

  @Post('/create')
  create(@Body() createTesteDto: any) {
    return this.testeService.create({ name: 'oi' });
  }

  @Get()
  findAll() {
    return this.testeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTesteDto: any) {
    return this.testeService.update(+id, updateTesteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testeService.remove(+id);
  }
}
