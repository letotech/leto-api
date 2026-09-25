import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { Repository, UpdateResult } from "typeorm";
import { BaseRepository } from "./base/base.repository";
import { IUserRepository } from "./interfaces/user.interface.repository";
import { FindUserDto } from "src/app/user/dto/find-user.dto";
import { CreateUserDto } from "src/app/user/dto/create-user.dto";


@Injectable()
export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository 
    {
    constructor(
        @InjectRepository(User)
        private readonly ormRepository: Repository<User>,
    ){
        super(ormRepository)
    }
    async customFind(params: FindUserDto): Promise<User[]>{
        const { 
            email,
            phone
        } = params

        const queryBuilder = this.ormRepository.createQueryBuilder('user');

        if(email){
            queryBuilder.andWhere('user.email = :email', {
                email
            })
        }

        if(phone){
            queryBuilder.andWhere('user.phone LIKE :phone', {
                phone
            })
        }

        const content = await queryBuilder.getMany();
        return content
    }
    async create(params: CreateUserDto): Promise<User>{
        const user = await this.ormRepository.create(params);
        return await this.ormRepository.save(user)
    }
}