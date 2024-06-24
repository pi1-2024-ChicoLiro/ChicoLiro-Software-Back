import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateDadosDto {
  @ApiProperty({
    description: 'The ID of the track this data belongs to',
    example: '60d0fe4f5311236168a109ca',
  })
  @IsString()
  trilhaID: string;

  @ApiProperty({
    description: 'The datetime that the request was sent',
    example: '135451321',
  })
  @IsInt()
  date: number;

  @ApiProperty({
    description: 'RPM value',
    example: 3000,
  })
  @IsNumber()
  rpm: number;

  @ApiProperty({
    description: 'Voltage value',
    example: 12,
  })
  @IsNumber()
  tensao: number;

  @ApiProperty({
    description: 'Voltage value',
    example: {},
  })
  @IsObject()
  trilha: object;
}
