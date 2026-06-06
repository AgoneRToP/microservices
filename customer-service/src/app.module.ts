import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './models/customer.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/customer-service'),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
