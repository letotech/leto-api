import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from 'src/app/user/dto/sign-in.dto';
import { UserService } from 'src/app/user/user.service';
import { IUserRepository } from 'src/repositories/interfaces/user.interface.repository';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: IUserRepository
    ){}

    async signIn(payload: SignInDto): Promise<any>{
        const user = await this.userRepository.findOne({
            where: { email: payload.email }
        })

        if(!user){
            throw new UnauthorizedException();
        }

        const { email, password } = payload;

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return new UnauthorizedException();
        }

        
    }
}
