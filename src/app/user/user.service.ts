import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject('userRepository')
        private readonly userRepository: UserRepository
    ){}

    async create(payload: CreateUserDto): Promise<User>{
        const user = await this.userRepository.create(payload);
        return user;
    }

    async find(payload?: FindUserDto): Promise<User[]>{
        return await this.userRepository.customFind(payload)
    }
    
    async findOne(id: number): Promise<User>{
        const user = await this.userRepository.findOne({
            where: { id }
        })
        return user
    }

    async softDelete(id: number): Promise<void>{
        await this.userRepository.softDelete(id)
    }

    async softRestore(id: number): Promise<void>{
        await this.userRepository.restore(id)
    }
}