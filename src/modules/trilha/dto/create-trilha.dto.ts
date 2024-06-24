import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
export class CreateTrilhaDto {
  @ApiProperty({
    description: 'The start time when the car began moving',
    example: '2023-05-28T14:35:00Z',
  })
  @IsDate()
  startMovingDatetime: string;
}
