import { Test, TestingModule } from '@nestjs/testing';
import { DadosController } from './dados.controller';

describe('DadosController', () => {
  let controller: DadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosController],
    }).compile();

    controller = module.get<DadosController>(DadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
