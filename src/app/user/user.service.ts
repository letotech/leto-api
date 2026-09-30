import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import bcrypt from 'bcrypt'
import { SignInDto } from "./dto/sign-in.dto";
import * as jwt from "jsonwebtoken"

@Injectable()
export class UserService {
    constructor(
        @Inject('userRepository')
        private readonly userRepository: UserRepository
    ){}

    async create(payload: CreateUserDto): Promise<User>{
        let { email, password, firstName, last_name } = payload

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

    async signIn(payload: SignInDto): Promise<{
        accessToken;
    }> {
        const user = await this.userRepository.findOne({ 
            where: { email: payload.email }
        })

        if(!user){
            throw new UnauthorizedException('Usuário ou senha inválido')
        }

        const isValid = await bcrypt.compare(payload.password, user.password)
        if(!isValid){
            throw new UnauthorizedException('Usuário ou senha inválido')
        }
        return this.generateUserToken(user);
    }

    async generateUserToken(user: User) {
        const accessToken = jwt.sign(
            {
                id: user.id,
                name: user.fullName,
                email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '14D'
            },
        );

        return { accessToken }
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