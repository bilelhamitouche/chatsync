import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import * as schema from '../database/schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(userId: string, email: string) {
    const expiresAccessToken = this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_EXPIRATION_MS',
    );
    const expiresRefreshToken = this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: `${expiresAccessToken}ms`,
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: `${expiresRefreshToken}ms`,
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      return user;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = await this.usersService.create(registerDto);
    const tokens = await this.login(newUser);
    return tokens;
  }

  async login(user: typeof schema.users.$inferSelect) {
    const {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    } = await this.generateTokens(user.id, user.email);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });
    return {
      accessToken,
      refreshToken,
      expiresAccessToken,
      expiresRefreshToken,
    };
  }

  async logout(id: string) {
    await this.usersService.update(id, {
      refreshToken: null,
    });
  }

  async verifyRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.usersService.findById(userId);
      const isMatch =
        user.refreshToken &&
        (await bcrypt.compare(refreshToken, user.refreshToken));
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
