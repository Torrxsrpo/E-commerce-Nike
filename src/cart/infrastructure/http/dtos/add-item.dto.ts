import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';

export class AddItemDto {
  @ApiProperty({ example: 'b3f1a2c4-1234-4a5b-8c9d-1234567890ab' })
  @IsUUID()
  variantId!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  quantity!: number;
}
