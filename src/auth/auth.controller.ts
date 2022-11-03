import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminResponse } from 'src/admins/dtos/admin-response.dto';
import { CreateAdmin } from 'src/admins/dtos/create-admin.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }

  @Post('auth/signup')
  signup(@Body() user: CreateAdmin): Promise<AdminResponse> {
    return { ...this.authService.create(user) };
  }
}
