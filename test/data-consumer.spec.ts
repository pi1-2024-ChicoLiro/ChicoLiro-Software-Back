// __tests__/data-consumer.spec.ts

import { DataConsumer } from '../src/queue/src/modules/data/data.consumer';
import { PrismaService } from '../database/prisma.service';
import { DataGateway } from '../src/modules/gateways/data.gateway';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { DataConsumerType } from '../src/shared/types/data-consumer.type';
import { Server } from 'socket.io';

jest.mock('../database/prisma.service');
jest.mock('../src/modules/gateways/data.gateway');

describe('DataConsumer', () => {
  let dataConsumer: DataConsumer;
  let prismaService: PrismaService;
  let dataGateway: DataGateway;
  let mockServer: Server;

  beforeEach(() => {
    prismaService = new PrismaService();

    Object.defineProperty(prismaService, 'trilha', {
      value: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      writable: false,
    });

    Object.defineProperty(prismaService, 'dados', {
      value: {
        create: jest.fn(),
        fields: { date: '1627660800000' },
      },
      writable: false,
    });

    dataGateway = new DataGateway({ handleData: jest.fn() } as any);
    mockServer = { emit: jest.fn() } as unknown as Server;
    dataGateway.server = mockServer;

    dataConsumer = new DataConsumer(dataGateway, prismaService);
    dataConsumer.logger = new Logger(DataConsumer.name);

    jest.clearAllMocks();
  });

  it('should create a new track and reset total distance when no active track is found', async () => {
    (prismaService.trilha.findFirst as jest.Mock).mockResolvedValue(null);
    (prismaService.trilha.create as jest.Mock).mockResolvedValue({ id: 1 });
    (prismaService.dados.create as jest.Mock).mockResolvedValue({
      date: '1627660800000',
    });

    const job: Job<DataConsumerType> = {
      data: {
        isMoving: true,
        rpmMotorDir: 1000,
        rpmMotorEsq: 1000,
        tensao: 12,
      },
    } as Job<DataConsumerType>;

    await dataConsumer.handleData(job);

    expect(prismaService.trilha.create).toHaveBeenCalled();
    expect(dataConsumer.getDistanciaTotal).toBe(0);
  });

  it('should update total distance and last request time on each data handling', async () => {
    (prismaService.trilha.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      startMovingDatetime: new Date(),
    });
    (prismaService.dados.create as jest.Mock).mockResolvedValue({
      date: '1627660800000',
    });

    const job: Job<DataConsumerType> = {
      data: {
        isMoving: true,
        rpmMotorDir: 1000,
        rpmMotorEsq: 1000,
        tensao: 12,
      },
    } as Job<DataConsumerType>;

    await dataConsumer.handleData(job);

    expect(dataConsumer.getDistanciaTotal).toBeGreaterThan(0);
    expect(dataConsumer.getLastRequestTime).toBe(1627660800000);
  });

  it('should save total distance and stop track when isMoving is false', async () => {
    (prismaService.trilha.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      startMovingDatetime: new Date(),
    });
    (prismaService.trilha.update as jest.Mock).mockResolvedValue({});
    (prismaService.dados.create as jest.Mock).mockResolvedValue({
      date: '1627660800000',
    });

    const job: Job<DataConsumerType> = {
      data: { isMoving: false, rpmMotorDir: 0, rpmMotorEsq: 0, tensao: 12 },
    } as Job<DataConsumerType>;

    dataConsumer.setDistanciaTotal = 100;

    await dataConsumer.handleData(job);

    expect(prismaService.trilha.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          isMoving: false,
          distanciaPercorrida: 100,
        }),
      }),
    );
  });

  it('should calculate correct speed, acceleration, and distance', () => {
    const velocidade = dataConsumer.calcularVelocidade(200, 200);
    const tempoRequest = 0.5; // 0.5 segundos
    dataConsumer.setLastVelocidade = 50;
    const aceleracao = dataConsumer.calcularAceleracao(
      velocidade,
      tempoRequest,
    );
    const distancia = dataConsumer.calcularDistancia(velocidade, tempoRequest);

    expect(velocidade).toBeCloseTo(71.21);
    expect(aceleracao).toBeCloseTo(42.42);
    expect(distancia).toBeCloseTo(35.6);
  });
});
