import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook-token-nest';

@Injectable()
export class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook-token',
) {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, customer: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const customer = {
      email: emails[0].value,
      full_name: `${name.givenName} ${name.familyName}`,
      environment: 'facebook',
    };
    const payload = {
      ...customer,
      accessToken,
    };

    done(null, payload);
  }
}
