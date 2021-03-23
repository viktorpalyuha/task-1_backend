import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/v3/auth/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
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
