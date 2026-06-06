import { ConflictException, Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './models/customer.model';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { CreateCustomerDto } from './dtos';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @InjectModel(Customer.name) private readonly model: Model<Customer>,
  ) {}

  @MessagePattern('SAY-HELLO')
  async sayHello(@Payload() payload: any) {
    console.log(payload);

    return 'Hello from CUSTOMER-SERVICE';
  }

  @MessagePattern('GET_CUSTOMER')
  @Get()
  async getCustomers() {
    const customers = await this.model.find();

    return {
      success: true,
      data: customers,
    };
  }

  @MessagePattern('CREATE_CUSTOMER')
  async createCustomer(@Payload() payload: CreateCustomerDto) {
    const existing = await this.model.findOne({ email: payload.email });

    if (existing) {
      throw new RpcException(
        new ConflictException(
          'Customer with the same email already exists',
        ).getResponse(),
      );
    }

    const customer = await this.model.create({
      ...payload,
    });

    return {
      success: true,
      data: customer,
    };
  }

  @MessagePattern('UPDATE_CUSTOMER')
  async updateCustomer(@Payload() data: { id: string } & CreateCustomerDto) {
    const { id, ...payload } = data;

    if (!isObjectIdOrHexString(id)) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Invalid customer ID').getResponse(),
          ),
      );
    }

    const customer = await this.model.findByIdAndUpdate(id, payload);

    return {
      success: true,
      data: customer,
    };
  }

  @MessagePattern('DELETE_CUSTOMER')
  async deleteCustomer(@Payload() id: string) {
    if (!isObjectIdOrHexString(id)) {
      return throwError(
        () =>
          new RpcException(
            new ConflictException('Invalid customer ID').getResponse(),
          ),
      );
    }

    await this.model.findByIdAndDelete(id);

    return {
      success: true,
      data: null,
    };
  }
}
