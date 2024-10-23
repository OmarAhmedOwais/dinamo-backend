import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { Model } from 'src/common/types/enums/Models';

@Module({
  imports: [MongooseModule.forFeature([{ name: Model.Product, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
