import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<Customer>> {
    const customer = await this.authService.validateCustomer(email, password);
    if (!customer) {
      throw new UnauthorizedException();
    }
    return customer;
  }
}
