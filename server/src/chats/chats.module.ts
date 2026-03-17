import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { MessagesModule } from 'src/messages/messages.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, MessagesModule],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
