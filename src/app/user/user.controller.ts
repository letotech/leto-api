import { Body, Controller, Get, Inject, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { SignInDto } from "./dto/sign-in.dto";

@Controller('user')
export class UserController {
    constructor(
        @Inject('userService')
        private readonly userService: UserService
    ){}

    @Post()
    async create(@Body() payload: CreateUserDto): Promise<User>{
        return await this.userService.create(payload)
    } 

    @Get()
    async find(): Promise<User[]>{
        return await this.userService.find();
    }

    @Patch('/remove/:id')
    async delete(@Param('id') id: number): Promise<void>{
        await this.userService.softDelete(id)
    }

    @Patch('/restore/:id')
    async restore(@Param('id') id: number): Promise<void>{
        await this.userService.softDelete(id)
    }

    @Post('/sign-in')
    async signIn(@Body() payload: SignInDto): Promise<any>{
        return this.userService.signIn(payload)
    }
}