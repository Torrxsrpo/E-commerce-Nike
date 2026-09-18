import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'CANCELLED', enum: ['PENDING', 'CANCELLED', 'DELIVERED'] })
  @IsIn(['PENDING', 'CANCELLED', 'DELIVERED'])
  status!: 'PENDING' | 'CANCELLED' | 'DELIVERED';
}
