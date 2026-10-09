import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';

export class CreateRoomDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  roomsCode: string;

}