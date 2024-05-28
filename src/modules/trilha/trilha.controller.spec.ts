import { Test, TestingModule } from '@nestjs/testing';
import { TrilhaController } from './trilha.controller';

describe('TrilhaController', () => {
  let controller: TrilhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrilhaController],
    }).compile();

    controller = module.get<TrilhaController>(TrilhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
