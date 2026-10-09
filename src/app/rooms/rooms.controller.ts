import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';

import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { RoomService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { FindRoomDto } from './dto/find-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
	constructor(
		@Inject('roomService')
		private readonly roomService: RoomService,
	) {}

	@Post()
	async create(@Body() payload: CreateRoomDto): Promise<Room> {
		return this.roomService.create(payload);
	}

	@Get()
	async find(@Query() filters: FindRoomDto): Promise<Room[]> {
		return this.roomService.find(filters);
	}

	@Get(':id')
	async findOne(
		@Param('id', ParseIntPipe) id: number,
	): Promise<Room> {
		return this.roomService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() payload: UpdateRoomDto,
	): Promise<Room> {
		return this.roomService.update(id, payload);
	}

	@Patch('remove/:id')
	async delete(
		@Param('id', ParseIntPipe) id: number,
	): Promise<void> {
		await this.roomService.softDelete(id);
	}

	@Patch('restore/:id')
	async restore(
		@Param('id', ParseIntPipe) id: number,
	): Promise<void> {
		await this.roomService.softRestore(id);
	}
}