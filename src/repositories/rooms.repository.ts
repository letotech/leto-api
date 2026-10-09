
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { BaseRepository } from './base/base.repository';
import { IRoomRepository } from './interfaces/rooms.interface.repository';

import { FindRoomDto } from 'src/app/rooms/dto/find-room.dto';
import { CreateRoomDto } from 'src/app/rooms/dto/create-room.dto';

@Injectable()
export class RoomRepository
    extends BaseRepository<Room>
    implements IRoomRepository {

    constructor(
        @InjectRepository(Room)
        private readonly ormRepository: Repository<Room>,
    ) {
        super(ormRepository);
    }

    async customFind(params: FindRoomDto): Promise<Room[]> {

        const { id, roomsCode } = params;

        const queryBuilder =
            this.ormRepository.createQueryBuilder('room');

        if (id != null) {
            queryBuilder.andWhere(
                'room.id = :id',
                { id }
            );
        }

        if (roomsCode != null) {
            queryBuilder.andWhere(
                'room.roomsCode = :roomsCode',
                { roomsCode }
            );
        }

        return await queryBuilder.getMany();
    }

    async create(params: CreateRoomDto): Promise<Room> {

        const room = this.ormRepository.create(params);

        return await this.ormRepository.save(room);
    }
}
