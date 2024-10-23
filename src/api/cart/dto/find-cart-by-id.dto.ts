import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindCartByIdDto {
  @ApiProperty({
    description: 'ID of the cart',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
