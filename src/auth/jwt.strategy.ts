import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: `http://localhost:8080/realms/YOUR_REALM/protocol/openid-connect/certs`,
      }),
      audience: 'nest-client',
      issuer: `http://localhost:8080/realms/YOUR_REALM`,
    });
  }

  async validate(payload: any) {
    return { sub: payload.sub, email: payload.email };
  }
}