import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import * as schema from '../database/schema';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Body()
    createChatDto: CreateChatDto,
  ) {
    return this.chatsService.create(createChatDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @CurrentUser() user: typeof schema.users.$inferSelect,
    @Query('search') search: string,
  ) {
    return this.chatsService.findAll(user.id, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const chat = await this.chatsService.findById(id);
    if (!chat) {
      throw new NotFoundException();
    }
    return chat;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/messages')
  @HttpCode(HttpStatus.OK)
  async findChatMessages(@Param('id') id: string) {
    return this.chatsService.findMessagesById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.chatsService.remove(id);
  }
}
