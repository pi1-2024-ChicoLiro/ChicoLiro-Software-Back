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
import { CreateDadosDto } from './dto/create-dados.dto';
import { UpdateDadosDto } from './dto/update-dados.dto';
import { DadosService } from './dados.service';

@Controller('api/dados')
@ApiTags('teste')
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Post('/create')
  create(@Body() createDadosDto: CreateDadosDto) {
    return this.dadosService.create(createDadosDto);
  }

  @Get()
  findAll() {
    return this.dadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dadosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDadosDto: UpdateDadosDto) {
    return this.dadosService.update(id, updateDadosDto);
  }
}
