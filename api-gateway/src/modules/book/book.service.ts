import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateBookDto } from './dtos';

@Injectable()
export class BookService {
  constructor(@Inject('BOOK-SERVICE') private readonly client: ClientProxy) {}

  async sayHello() {
    return this.client.send('SAY-HELLO', { message: 'Hello from gateway' });
  }

  async getAllBooks() {
    return this.client.send('GET_BOOKS', '');
  }

  async createBook(payload: CreateBookDto) {
    return this.client.send('CREATE_BOOK', payload);
  }

  async updateBook(payload: CreateBookDto, id: string) {
    return this.client.send('UPDATE_BOOK', { ...payload, id });
  }

  async deleteBook(id: string) {
    return this.client.send('DELETE_BOOK', id);
  }
}
