import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        @Inject('userRepository')
        private readonly userRepository: UserRepository
    ){}

    async create(): Promise<Partial<User>>{
        
    }
}