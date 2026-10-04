import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Bed } from 'src/providers/database/entities/neon-db/bed.entity';
import { BedRepository } from 'src/repositories/bed.repository'
import { CreateBedDto } from './dto/create-bed.dto';
import { FindBedDto } from './dto/find-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Injectable()
export class BedService {
	constructor(
		@Inject('bedRepository')
		private readonly bedRepository: BedRepository,
	) {}

	async create(payload: CreateBedDto): Promise<Bed> {
        return this.bedRepository.create(payload);
    }

	async find(filters?: FindBedDto): Promise<Bed[]> {
        return this.bedRepository.customFind(filters);
    }

	async findOne(id: number): Promise<Bed> {
		const bed = await this.bedRepository.findOne({ where: { id } });
		if (!bed) {
			throw new NotFoundException(`Leito ${id} não encontrado`);
		}
		return bed;
	}

    async update(id: number, payload: UpdateBedDto): Promise<Bed> {
        await this.findOne(id);
        await this.bedRepository.update(id, payload);
        return this.findOne(id);
    }

	async softDelete(id: number): Promise<void> {
		await this.findOne(id);
		await this.bedRepository.softDelete(id);
	}

	async softRestore(id: number): Promise<void> {
		await this.bedRepository.restore(id);
	}
}
