import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartSchema } from './cart.schema';
import { ProductSchema } from '../product/product.schema';
import { UserSchema } from '../user/user.schema';
import { Model } from 'src/common/types/enums/Models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Model.Cart, schema: CartSchema },
      { name: Model.Product, schema: ProductSchema }, 
      { name: Model.User, schema: UserSchema }, 
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
