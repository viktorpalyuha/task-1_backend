import { Customer } from './entities/customer.entity';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<{ JWT_token: string }> {
    return await this.authService.login(req.customer);
  }

  @Post('register')
  async register(@Body() registrationData: Customer) {
    return await this.authService.register(registrationData);
  }
}
