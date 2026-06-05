import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './models/book.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/book-service'),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [AppController],
})
export class AppModule {}
