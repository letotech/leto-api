import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import bcrypt from 'bcrypt'
import { isExternal } from "util/types";

@Injectable()
export class UserService {
    constructor(
        @Inject('userRepository')
        private readonly userRepository: UserRepository
    ){}

    async create(payload: CreateUserDto): Promise<User>{
        let { email, password } = payload
        const user = await this.userRepository.findOne({
            where: { email }
        })

        if(user){
            throw new BadRequestException("Email já cadastrado. Caso tenha esquecido a sua senha, clique em recuperar senha");
        }

        try {
            const salt = 10;
            const hash = await bcrypt.hash(password, salt)
            password = hash
        } catch(err){
            console.log(err)
            throw new InternalServerErrorException(err)
        }

        return await this.userRepository.create(payload);
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