import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'src/common/types/enums/Models';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Model.User, schema: UserSchema }])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
