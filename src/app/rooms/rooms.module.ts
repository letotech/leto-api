import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomRepository } from 'src/repositories/room.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Room]),
	],

	controllers: [
		RoomController,
	],

	providers: [
		{
			provide: 'roomService',
			useClass: RoomService,
		},
		{
			provide: 'roomRepository',
			useClass: RoomRepository,
		},
	],
})
export class RoomModule {}