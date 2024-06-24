import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
import { TrilhaService } from './trilha.service';

@Controller('api/trilha')
@ApiTags('Trilha')
export class TrilhaController {
  constructor(private readonly trilhaService: TrilhaService) {}

  @Post('/create')
  create(@Body() createTesteDto: CreateTrilhaDto) {
    return this.trilhaService.create(createTesteDto);
  }

  @Patch('/failed')
  failed(@Body() body: any) {
    return this.trilhaService.failed(body);
  }

  @Get('get-paginado')
  findAll(
    @Param('trilhaId') trilhaId: string,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.trilhaService.getPaginado(trilhaId, page, limit);
  }

  @Get('get-all')
  get() {
    return this.trilhaService.getAll();
  }

  @Patch('update-trilha/:id')
  update(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhaService.update(id, updateTrilhaDto);
  }
}
