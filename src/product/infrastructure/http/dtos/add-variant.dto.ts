import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class AddVariantDto {
  @ApiProperty({ example: '42' })
  @IsString()
  @MinLength(1)
  size!: string;

  @ApiProperty({ example: 'black' })
  @IsString()
  @MinLength(1)
  color!: string;

  @ApiProperty({ example: 'AM90-42-BLK' })
  @IsString()
  @MinLength(1)
  sku!: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock!: number;
}
