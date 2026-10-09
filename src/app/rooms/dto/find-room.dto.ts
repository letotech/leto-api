import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';

import { Type } from 'class-transformer';

export class FindRoomDto {

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  roomsCode?: string;

}