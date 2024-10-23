import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Model } from 'src/common/types/enums/Models';

@Schema()
export class Cart extends Document {
  @Prop({ required: true, ref: Model.User })
  user: string;

  @Prop([{ type: 'ObjectId', ref: Model.Product }])
  products: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
