import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookModule } from './modules/book/book.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    ClientsModule.register({
      isGlobal: true,
      clients: [
        {
          name: 'BOOK-SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'book_queue',
            noAck: true,
            queueOptions: { durable: true },
          },
        },
        {
          name: 'CUSTOMER-SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'customer_queue',
            noAck: true,
            queueOptions: { durable: true },
          },
        },
        {
          name: 'ORDER-SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3003,
          },
        },
      ],
    }),
    BookModule,
    CustomerModule,
  ],
})
export class AppModule {}
