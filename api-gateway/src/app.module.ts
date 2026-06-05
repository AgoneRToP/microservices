import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookModule } from './modules/book/book.module';

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
            noAck: false,
            queueOptions: { durable: true },
          },
        },
        {
          name: 'CUSTOMER-SERVICE',
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3002,
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
  ],
})
export class AppModule {}
