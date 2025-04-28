import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './@interfaces/jwt-payload.interface';
import { UserEntity } from '../data/dao/user.entity';
import { UsersRepository } from '../data/repositories/users.repository';
import { ConfigService } from '@nestjs/config';

/**
 * JWT authentication strategy for validating user tokens.
 * Extracts the JWT from the Authorization header and validates the user.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validate the JWT payload and return the corresponding user.
   * Throws UnauthorizedException if the user does not exist.
   */
  async validate({ username }: JwtPayload): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
