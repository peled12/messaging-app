import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @ArrayMinSize(2) // min 2 chatters
  @ArrayMaxSize(10) // max 10 chatters
  @IsInt({ each: true })
  chatters: number[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[];

  @IsString()
  @IsOptional()
  group_title: string;
}

class MessageDto {
  @IsInt()
  sender: number;

  @IsArray()
  @IsInt({ each: true })
  read_by: number[];

  @IsOptional()
  @IsInt()
  replied_index?: number;

  @IsString()
  message: string;

  @IsBoolean()
  deleted: boolean;

  @IsDate()
  date_sent: Date;
}
