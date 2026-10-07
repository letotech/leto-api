import { BadRequestException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

@Injectable()
export class UserService {
  constructor(
      @Inject('userRepository')
      private readonly userRepository: UserRepository
  ){}

  private async create(payload: CreateUserDto): Promise<User>{
    return await this.userRepository.create(payload);
  }

  async find(): Promise<User[]>{
      return await this.userRepository.find()
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

  async login(payload: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if(!user) {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const isValid = await bcrypt.compare(payload.password, user.password)
    if (!isValid) {
      throw new UnauthorizedException('Credenciais inválidas')
    }
    return await this.generateUserToken(user);
  }

  async signUp(payload: CreateUserDto): Promise<{ accessToken: string, user: User }> {
    const existingEmail = await this.userRepository.findOne({
      where: { email: payload.email }
    })
    if(existingEmail){
      throw new BadRequestException('Este e-mail já está cadastrado')
    }

    const existingCpf = await this.userRepository.findOne({
      where: { cpf: payload.cpf }
    })
    if(existingCpf){
      throw new BadRequestException('Este CPF já está cadastrado')
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12)
    payload.password = hashedPassword
    payload.fullName = payload.firstName + ' ' + payload.lastName

    const user = await this.create(payload)
    const { accessToken } = await this.generateUserToken(user)

    return { accessToken, user }
  }

  private async generateUserToken(user: User) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '14D',
      },
    );

    return { accessToken }
  }
}