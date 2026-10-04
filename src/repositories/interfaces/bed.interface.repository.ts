import { Bed } from "src/providers/database/entities/neon-db/bed.entity";
import { IBaseRepository } from "../base/base.interface.repository";
import { FindBedDto } from "src/app/beds/dto/find-bed.dto";

export interface IBedRepository extends IBaseRepository<Bed>{
    customFind(params: FindBedDto): Promise<Bed[]>;
}