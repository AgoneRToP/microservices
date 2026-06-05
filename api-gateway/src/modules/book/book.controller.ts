import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos';

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get('hello')
  async sayHello() {
    return await this.service.sayHello();
  }

  @Get()
  async getAllBooks() {
    return await this.service.getAllBooks();
  }

  @Post()
  async createBook(@Body() payload: CreateBookDto) {
    return await this.service.createBook(payload);
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() payload: CreateBookDto) {
    return await this.service.updateBook(payload, id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return await this.service.deleteBook(id);
  }
}
