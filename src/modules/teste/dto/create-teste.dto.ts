import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTesteDto {
  @ApiProperty({
    description: 'Name of the Teste',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  age?: number;
}
