import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from './dtos';

@Injectable()
export class CustomerService {
  constructor(@Inject('CUSTOMER-SERVICE') private readonly client: ClientProxy) {}

  async sayHello() {
    return this.client.send('SAY-HELLO', { message: 'Hello from gateway' });
  }

  async getAllCustomers() {
    return this.client.send('GET_CUSTOMERS', '');
  }

  async createCustomer(payload: CreateCustomerDto) {
    return this.client.send('CREATE_CUSTOMER', payload);
  }

  async updateCustomer(payload: CreateCustomerDto, id: string) {
    return this.client.send('UPDATE_CUSTOMER', { ...payload, id });
  }

  async deleteCustomer(id: string) {
    return this.client.send('DELETE_CUSTOMER', id);
  }
}
