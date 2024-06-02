import { Module } from '@nestjs/common';
import { DadosModule } from './modules/dados/dados.module';
import { TrilhaModule } from './modules/trilha/trilha.module';
@Module({
  imports: [TrilhaModule, DadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
