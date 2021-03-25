import { CustomerService } from './customer/customer.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Customer } from './entities/customer.entity';
@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(
    email: string,
    pass: string,
  ): Promise<Partial<Customer>> {
    const customer = await this.customersService.findByEmail(email);
    if (customer && customer.password === pass) {
      const { password, ...result } = customer;
      return result;
    }
    return null;
  }

  async login(customer: Customer): Promise<{ JWT_token: string }> {
    const payload = { email: customer.email, sub: customer.id };
    return {
      JWT_token: this.jwtService.sign(payload),
    };
  }
}
