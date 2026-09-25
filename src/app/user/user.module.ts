import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "src/repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [User],
        )
    ],
    controllers: [UserController],
    providers: [
        {
            provide: 'userService',
            useClass: UserService
        },
        {
            provide: 'userRepository',
            useClass: UserRepository
        }
    ],
})
export class UserModule{}