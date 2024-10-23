import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'src/common/types/enums/Models';

@Schema()
export class Product extends Document {
  @ApiProperty({ description: 'The name of the product', example: 'Product A' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'The price of the product', example: 49.99 })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a sample product',
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The vendor ID that owns this product',
    example: '60bdfc5b12f5a132d4e79a8f',
  })
  @Prop({ required: true, ref: Model.Vendor })
  vendor: string;

  @ApiProperty({
    description: 'The URL of the product image',
    example: 'http://example.com/image.jpg',
  })
  @Prop()
  imageUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
