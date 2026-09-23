import { User } from "src/providers/database/entities/neon-db/user.entity";
import { IBaseRepository } from "../base/base.interface.repository";
import { FindUserDto } from "src/app/user/dto/find-user.dto";

export interface IUserRepository extends IBaseRepository<User>{
    customFind(params: FindUserDto): Promise<User[]>;
}