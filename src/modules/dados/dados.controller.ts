import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DadosService } from './dados.service';

@Controller('api/dados')
@ApiTags('Dados')
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Get('get-by-trilha/:trilhaId')
  findAll(
    @Param('trilhaId') trilhaId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.dadosService.findbyTrilha(trilhaId, page, limit);
  }

  @Get('get-paginado')
  get(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.dadosService.getAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dadosService.findOne(id);
  }

  @Post('receive-data')
  receiveData(@Body() data: any) {
    return this.dadosService.receiveData(data);
  }
}
