import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dtos';

@Controller('customers')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get('hello')
  async sayHello() {
    return await this.service.sayHello();
  }

  @Get()
  async getAllCustomers() {
    return await this.service.getAllCustomers();
  }

  @Post()
  async createCustomer(@Body() payload: CreateCustomerDto) {
    return await this.service.createCustomer(payload);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: string, @Body() payload: CreateCustomerDto) {
    return await this.service.updateCustomer(payload, id);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return await this.service.deleteCustomer(id);
  }
}
