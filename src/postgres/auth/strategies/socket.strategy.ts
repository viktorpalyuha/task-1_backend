import { Customer } from './../entities/customer.entity';
import { AuthService } from './../auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken: string = client.handshake?.query?.authorization;
      const customer: Customer = await this.authService.getCustomerFromAuthenticationToken(
        authToken,
      );
      context.switchToHttp().getRequest().customer = customer;

      return Boolean(customer);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
