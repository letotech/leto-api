import {
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { RoomRepository } from 'src/repositories/rooms.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
	constructor(
		@Inject('roomRepository')
		private readonly roomRepository: RoomRepository,
	) {}

	async create(payload: CreateRoomDto): Promise<Room> {
		return this.roomRepository.create(payload);
	}

	async find(filters?: FindRoomDto): Promise<Room[]> {
		return this.roomRepository.customFind(filters);
	}

	async findOne(id: number): Promise<Room> {
		const room = await this.roomRepository.findOne({
			where: { id },
		});

		if (!room) {
			throw new NotFoundException(
				`Quarto ${id} não encontrado`,
			);
		}

		return room;
	}

	async update(
		id: number,
		payload: UpdateRoomDto,
	): Promise<Room> {

		await this.findOne(id);

		await this.roomRepository.update(
			id,
			payload,
		);

		return this.findOne(id);
	}

	async softDelete(id: number): Promise<void> {
		await this.findOne(id);

		await this.roomRepository.softDelete(id);
	}

	async softRestore(id: number): Promise<void> {
		await this.roomRepository.restore(id);
	}
}