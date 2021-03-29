import { Customer } from './entities/customer.entity';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<{ JWT_token: string }> {
    return await this.authService.login(req.customer);
  }

  @Post('register')
  async register(@Body() registrationData: Customer) {
    return await this.authService.register(registrationData);
  }

  @Post('facebook')
  @UseGuards(AuthGuard('facebook-token'))
  async facebookLogin(@Req() req): Promise<{ JWT_token: string }> {
    try {
      return await this.authService.login(req.customer);
    } catch (error) {
      await this.authService.register(req.customer);
      return await this.authService.login(req.customer);
    }
  }
}
