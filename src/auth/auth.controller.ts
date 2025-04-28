import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

/**
 * Controller for handling authentication-related HTTP requests.
 * Provides endpoints for user registration and sign-in.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user with the provided credentials.
   */
  @Post('/register')
  async register(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  /**
   * Authenticate a user and return a JWT access token.
   */
  @Post('/signin')
  async signIn(@Body() dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }
}
