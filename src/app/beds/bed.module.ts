import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bed } from 'src/providers/database/entities/neon-db/bed.entity';
import { BedController } from './bed.controller';
import { BedService } from './bed.service';
import { BedRepository } from 'src/repositories/bed.repository';

@Module({
	imports: [TypeOrmModule.forFeature([Bed])],
	controllers: [BedController],
	providers: [
		{
			provide: 'bedService',
			useClass: BedService,
		},
        {
        provide: 'bedRepository',
            useClass: BedRepository,
        },
	],
})
export class BedModule {}
