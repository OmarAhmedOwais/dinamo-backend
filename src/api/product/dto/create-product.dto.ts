import { IsString, IsNumber, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto  {
  @ApiProperty({ description: 'The name of the product', example: 'Product A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The price of the product', example: 99.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'The description of the product', example: 'A description for the product' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The vendor ID associated with the product', example: '60bdfc5b12f5a132d4e79a8f' })
  @IsString()
  @IsNotEmpty()
  vendor: string;

  @ApiProperty({ description: 'The image URL of the product', example: 'http://example.com/image.jpg' })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
