import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, MinLength } from 'class-validator';
import { IsString } from 'class-validator';

export class CheckoutDto {
  @ApiProperty({ example: 'b3f1a2c4-1234-4a5b-8c9d-1234567890ab' })
  @IsUUID()
  cartId!: string;

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MinLength(2)
  contactName!: string;

  @ApiProperty({ example: 'jane.doe@example.com' })
  @IsEmail()
  contactEmail!: string;
}
