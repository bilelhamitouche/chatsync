import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as schema from '../database/schema';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.register(registerDto);
    response.cookie('Authentication', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(Date.now() + Number(tokens.expiresAccessToken)),
    });
    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: typeof schema.users.$inferSelect) {
    await this.authService.logout(user.id);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  async refreshToken(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(Date.now() + Number(tokens.expiresAccessToken)),
    });
    response.cookie('Refresh', tokens.refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: new Date(Date.now() + Number(tokens.expiresRefreshToken)),
    });
  }
}
