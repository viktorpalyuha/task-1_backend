import { CustomerService } from './customer/customer.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Customer } from './entities/customer.entity';
import { jwtConstants } from './strategies/jwtConstants';
@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomerService,
    private jwtService: JwtService,
  ) {}

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    if (payload.email) {
      return this.customersService.findByEmail(payload.email);
    }
  }

  async validateCustomer(
    email: string,
    password: string,
  ): Promise<Partial<Customer>> {
    const customer = await this.customersService.findByEmail(email);
    if (customer && customer.comparePassword(password)) {
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

  async register(registrationData: Customer) {
    return await this.customersService.create(registrationData);
  }
}
