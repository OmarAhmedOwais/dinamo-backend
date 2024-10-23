import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module'; // Import the new ConfigModule
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';
import { VendorModule } from './api/vendor/vendor.module';
import { CartModule } from './api/cart/cart.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigModule,  // Use the separated ConfigModule
    // Application Modules
    UserModule,
    ProductModule,
    VendorModule,
    CartModule,
    AuthModule,
  ],
})
export class AppModule {}
