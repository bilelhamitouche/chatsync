import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isGroup: boolean;

  @IsNotEmpty()
  @IsArray()
  members: string[];
}
