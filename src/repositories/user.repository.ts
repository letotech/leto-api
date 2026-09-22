import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User, process.env.NEON_DB_URL)
        private readonly ormRepository: Repository<User>,
    ){}
    async create(): Promise<Partial<User>>{
        return User{}
    }
}