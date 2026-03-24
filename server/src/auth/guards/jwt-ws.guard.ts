import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.cookie
      ?.split(';')
      .find((c) => c.trim().startsWith('Authentication='))
      ?.split('=')[1];
    return {
      cookies: {
        Authentication: token,
      },
    };
  }
}
