import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './jwtConstants';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from './customer/customer.module';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    CustomerModule,
    PassportModule.register({
      property: 'customer',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
