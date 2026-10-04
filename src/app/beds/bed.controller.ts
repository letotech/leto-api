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
import { Bed } from 'src/providers/database/entities/neon-db/bed.entity';
import { BedService } from './bed.service';
import { CreateBedDto } from './dto/create-bed.dto';
import { FindBedDto } from './dto/find-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Controller('bed')
export class BedController {
	constructor(
		@Inject('bedService')
		private readonly bedService: BedService,
	) {}

	@Post()
	async create(@Body() payload: CreateBedDto): Promise<Bed> {
		return this.bedService.create(payload);
	}

	@Get()
	async find(@Query() filters: FindBedDto): Promise<Bed[]> {
		return this.bedService.find(filters);
	}

	@Get(':id')
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<Bed> {
		return this.bedService.findOne(id);
	}

	@Patch(':id')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() payload: UpdateBedDto,
	): Promise<Bed> {
		return this.bedService.update(id, payload);
	}

	@Patch('remove/:id')
	async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
		await this.bedService.softDelete(id);
	}

	@Patch('restore/:id')
	async restore(@Param('id', ParseIntPipe) id: number): Promise<void> {
		await this.bedService.softRestore(id);
	}
}
