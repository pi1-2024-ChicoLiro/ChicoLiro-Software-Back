import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDadosDto } from 'src/modules/dados/dto/create-dados.dto';

export class CreateTrilhaDto {
  @ApiProperty({
    description: 'The name of the track',
    example: 'Percurso 1',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates if the car is currently moving',
    example: false,
  })
  @IsBoolean()
  isMoving: boolean;

  @ApiProperty({
    description: 'The start time when the car began moving',
    example: '2023-05-28T14:35:00Z',
  })
  @IsISO8601()
  startMovingDateTime: string;

  @ApiPropertyOptional({
    description: 'The end time when the car stopped moving',
    example: '2023-05-28T15:00:00Z',
  })
  @IsISO8601()
  @IsOptional()
  endMovingDateTime?: string;

  @ApiProperty({
    type: [CreateDadosDto],
    description: 'List of associated data entries',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateDadosDto)
  dados: CreateDadosDto[];
}
