import { IsOptional, IsMongoId, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @IsOptional()
  @IsMongoId()
  readonly userId?: string;

  @ApiProperty({
    description: 'Array of product IDs in the cart',
    example: ['60bdfc5b12f5a132d4e79a8f', '60bdfc5b12f5a132d4e79a90'],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly products?: string[];

  @ApiProperty({
    description: 'Total price of the cart',
    example: 120.99,
  })
  @IsOptional()
  @IsNumber()
  readonly totalPrice?: number;
}
