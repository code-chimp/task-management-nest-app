import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../data/repositories/users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './@interfaces/jwt-payload.interface';

/**
 * Service providing authentication logic, including user registration and login.
 * Uses JWT for issuing access tokens and bcrypt for password hashing.
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  /**
   * Register a new user with the provided credentials.
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDto);
  }

  /**
   * Authenticate a user and return a JWT access token if credentials are valid.
   * Throws UnauthorizedException if authentication fails.
   */
  async signIn({ username, password }: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('Please check your login credentials');
  }
}
