import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class FailedTrilhaDto {
  @ApiProperty({
    description: 'The end time when the car stopped moving',
    example: '2023-05-28T15:00:00Z',
  })
  @IsDate()
  endMovingDatetime: string;
}
