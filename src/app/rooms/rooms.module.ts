import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Room } from 'src/providers/database/entities/neon-db/rooms.entity';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { RoomRepository } from 'src/repositories/rooms.repository';

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