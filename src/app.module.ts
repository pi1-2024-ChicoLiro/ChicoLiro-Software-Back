import { Module } from '@nestjs/common';
import { TesteModule } from './modules/teste/teste.module';

@Module({
  imports: [TesteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
