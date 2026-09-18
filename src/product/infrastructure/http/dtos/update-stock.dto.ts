import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsPositive } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  @IsPositive()
  quantity!: number;

  @ApiProperty({ example: 'increase', enum: ['increase', 'decrease'] })
  @IsIn(['increase', 'decrease'])
  operation!: 'increase' | 'decrease';
}
