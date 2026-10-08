import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from 'src/providers/database/entities/neon-db/room.entity';
import { BaseRepository } from './base/base.repository';
import { IRoomRepository } from './interfaces/room.interface.repository';

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

        const {
            organizationId,
        } = params;

        const queryBuilder =
            this.ormRepository.createQueryBuilder('room');

        if (organizationId != null) {
            queryBuilder.andWhere(
                'room.organizationId = :organizationId',
                { organizationId }
            );
        }

        return await queryBuilder.getMany();
    }

    async create(params: CreateRoomDto): Promise<Room> {

        const room = this.ormRepository.create(params);

        return await this.ormRepository.save(room);
    }
}