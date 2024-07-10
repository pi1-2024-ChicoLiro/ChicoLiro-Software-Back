import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GraficosService } from './graficos.service';

@Controller('api/graficos')
@ApiTags('Gráficos')
export class GraficosController {
  constructor(private readonly graficosService: GraficosService) {}

  @Get('get-all')
  getAll() {
    return this.graficosService.formatarDadosGraficos();
  }

  @Get('get-lines')
  getLines() {
    return this.graficosService.getDataLine();
  }
}
