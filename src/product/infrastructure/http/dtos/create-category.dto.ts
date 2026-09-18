import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Running' })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiProperty({ example: 'running' })
  @IsString()
  @MinLength(2)
  slug!: string;
}
