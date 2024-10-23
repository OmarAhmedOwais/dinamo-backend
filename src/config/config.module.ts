import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { configuration } from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
  ],
  exports: [NestConfigModule, MongooseModule],
})
export class ConfigModule {}
