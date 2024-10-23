import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveProductFromCartDto {
  @ApiProperty({
    description: 'ID of the product to remove from the cart',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly productId: string;
}
