import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDadosDto {
  @ApiProperty({
    description: 'The ID of the track this data belongs to',
    example: '60d0fe4f5311236168a109ca',
  })
  @IsString()
  TrilhaID: string;

  @ApiProperty({
    description: 'RPM value',
    example: 3000,
  })
  @IsNumber()
  rpm: number;

  @ApiProperty({
    description: 'Infrared left sensor value',
    example: 1,
  })
  @IsNumber()
  infraVermelhoEsq: number;

  @ApiProperty({
    description: 'Infrared middle sensor value',
    example: 1,
  })
  @IsNumber()
  infraVermelhoMeio: number;

  @ApiProperty({
    description: 'Infrared right sensor value',
    example: 1,
  })
  @IsNumber()
  infraVermelhoDird: number;

  @ApiProperty({
    description: 'Voltage value',
    example: 12,
  })
  @IsNumber()
  tensao: number;
}
