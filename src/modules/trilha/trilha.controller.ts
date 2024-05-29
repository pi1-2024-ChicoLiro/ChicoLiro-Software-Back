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
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
import { TrilhaService } from './trilha.service';

@Controller('api/trilha')
@ApiTags('teste')
export class TrilhaController {
  constructor(private readonly trilhaService: TrilhaService) {}

  @Post('/create')
  create(@Body() createTesteDto: CreateTrilhaDto) {
    return this.trilhaService.create(createTesteDto);
  }

  @Get()
  findAll() {
    return this.trilhaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trilhaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhaService.update(id, updateTrilhaDto);
  }
}
