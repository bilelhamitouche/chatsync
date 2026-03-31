import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as schema from '../database/schema';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('members')
  @HttpCode(HttpStatus.OK)
  async findMembers(@CurrentUser() user: typeof schema.users.$inferSelect) {
    return this.usersService.findMembers(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  @HttpCode(HttpStatus.CREATED)
  async updateProfileInfo(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Body() updateProfileInfoDto: UpdateProfileInfoDto,
  ) {
    return this.usersService.update(user.id, updateProfileInfoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  @HttpCode(HttpStatus.CREATED)
  async updatePassword(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(
      user.id,
      updatePasswordDto.currentPassword,
      updatePasswordDto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    await this.usersService.deleteAccount(user.id, deleteAccountDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
