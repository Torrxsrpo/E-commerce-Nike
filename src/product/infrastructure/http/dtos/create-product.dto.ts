import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'b3f1a2c4-1234-4a5b-8c9d-1234567890ab' })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({ example: 'Air Max 90' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'Classic Nike sneaker with visible Air cushioning.' })
  @IsString()
  @MinLength(2)
  description!: string;

  @ApiProperty({ example: 149.99 })
  @IsNumber()
  @IsPositive()
  basePrice!: number;
}
