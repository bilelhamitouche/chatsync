import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { DatabaseModule } from 'src/database/database.module';
import { MessagesGateway } from './messages.gateway';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [DatabaseModule, ChatsModule, CloudinaryModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
