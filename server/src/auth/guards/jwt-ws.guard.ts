import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookie = client.handshake.headers.cookie
      ?.split(';')
      .find((c: string) => c.trim().startsWith('Authentication='))
      ?.split('=')[1];
    if (!cookie) return false;
    try {
      const payload = await this.jwtService.verifyAsync(cookie, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      });
      client.data.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}
