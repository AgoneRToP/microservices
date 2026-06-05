import { ConflictException, Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './models/book.model';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { CreateBookDto } from './dtos';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(@InjectModel(Book.name) private readonly model: Model<Book>) {}

  @MessagePattern('SAY-HELLO')
  async sayHello(@Payload() payload: any) {
    console.log(payload);

    return 'Hello from BOOK-SERVICE';
  }

  @MessagePattern('GET_BOOKS')
  async getBooks() {
    const books = await this.model.find();

    return {
      success: true,
      data: books,
    };
  }

  @MessagePattern('CREATE_BOOK')
  async createBook(@Payload() payload: CreateBookDto) {
    const existing = await this.model.findOne({
      $and: [{ title: payload.title }, { author: payload.author }],
    });

    if (existing) {
      throw new RpcException(
        new ConflictException(
          'Book with the same title and author already exists',
        ).getResponse(),
      );
    }

    const book = await this.model.create({
      author: payload.author,
      title: payload.title,
      definition: payload.definition,
      quantity: payload.quantity,
    });

    return {
      success: true,
      data: book,
    };
  }

  @MessagePattern('UPDATE_BOOK')
  async updateBook(@Payload() payload: CreateBookDto, id: string) {
    if (!isObjectIdOrHexString(id)) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Invalid book ID').getResponse(),
          ),
      );
    }

    const existing = await this.model.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!existing) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Book not found').getResponse(),
          ),
      );
    }

    return {
      success: true,
      data: existing,
    };
  }

  @MessagePattern('DELETE_BOOK')
  async deleteBook(id: string) {
    if (!isObjectIdOrHexString(id)) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Invalid book ID').getResponse(),
          ),
      );
    }

    const existing = await this.model.findByIdAndDelete(id);

    if (!existing) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Book not found').getResponse(),
          ),
      );
    }

    return {
      success: true,
      message: existing,
    };
  }
}
