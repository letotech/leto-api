import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { CreateRoomDto } from 'src/app/rooms/dto/create-room.dto';
import { FindRoomDto } from 'src/app/rooms/dto/find-room.dto';

export interface IRoomRepository {

    customFind(params: FindRoomDto): Promise<Room[]>;

    create(params: CreateRoomDto): Promise<Room>;
}