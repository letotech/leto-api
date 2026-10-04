import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bed } from "src/providers/database/entities/neon-db/bed.entity";
import { Repository } from "typeorm";
import { BaseRepository } from "./base/base.repository";
import { IBedRepository } from "./interfaces/bed.interface.repository";
import { FindBedDto } from "src/app/beds/dto/find-bed.dto";
import { CreateBedDto } from "src/app/beds/dto/create-bed.dto";

@Injectable()
export class BedRepository
    extends BaseRepository<Bed>
    implements IBedRepository 
    {
    constructor(
        @InjectRepository(Bed)
        private readonly ormRepository: Repository<Bed>,
    ){
        super(ormRepository)
    }

    async customFind(params: FindBedDto): Promise<Bed[]>{
        const { 
            bedCode,
            roomsId,
            organizationId,
            bedStatus
        } = params

        const queryBuilder = this.ormRepository.createQueryBuilder('bed');

        if(bedCode){
            queryBuilder.andWhere('bed.bedCode LIKE :bedCode', {
                bedCode: `%${bedCode}%`
            })
        }

        if(roomsId){
            queryBuilder.andWhere('bed.roomsId = :roomsId', {
                roomsId
            })
        }

        if(organizationId){
            queryBuilder.andWhere('bed.organizationId = :organizationId', {
                organizationId
            })
        }

        if(bedStatus){
            queryBuilder.andWhere('bed.bedStatus = :bedStatus', {
                bedStatus
            })
        }

        const content = await queryBuilder.getMany();
        return content
    }

    async create(params: CreateBedDto): Promise<Bed>{
        const bed = await this.ormRepository.create(params);
        return await this.ormRepository.save(bed)
    }
}