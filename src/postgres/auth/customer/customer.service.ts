import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findByEmail(email: string): Promise<Customer> {
    return await this.customersRepository.findOne({ email });
  }

  async create(customer: Customer) {
    const newCustomer = await this.customersRepository.create(customer);

    await this.customersRepository.save(newCustomer);
    return newCustomer;
  }
}
