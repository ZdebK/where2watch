import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService, LoginDto, RegisterDto, AuthResponse } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Login error:', error);
      throw new HttpException(
        'Unable to login. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new HttpException(
        'Unable to register. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('verify')
  async verifyToken(@Headers('authorization') authorization: string): Promise<{ valid: boolean; user?: any }> {
    try {
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }

      const token = authorization.substring(7);
      const payload = await this.authService.validateToken(token);

      return {
        valid: true,
        user: payload,
      };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
