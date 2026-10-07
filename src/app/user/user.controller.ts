import { Body, Controller, Get, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "src/providers/database/entities/neon-db/user.entity";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";

@Controller('user')
export class UserController {
  constructor(
      @Inject('userService')
      private readonly userService: UserService
  ){}
  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<User[]>{
    try {
      return await this.userService.find();
    } catch(error){
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/remove/:id')
  async delete(@Param('id') id: number): Promise<void>{
    try {
      await this.userService.softDelete(id)
    } catch(error){
      console.log(error)
      throw error
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/restore/:id')
  async restore(@Param('id') id: number): Promise<void>{
    try {
      await this.userService.softDelete(id)
    } catch(error){
      console.log(error)
      throw error
    }
  }

  @Post('/login')
  async login(@Body() payload: LoginDto): Promise<{ accessToken: string }>{
    try {
      return await this.userService.login(payload)
    } catch(error){
      console.log(error)
      throw error
    }
  }

  @Post('/sign-up')
  async signUp(@Body() payload: CreateUserDto): Promise<{ accessToken: string, user: User }>{
    try {
      return await this.userService.signUp(payload)
    } catch(error){
      console.log(error)
      throw error
    }
  }
}