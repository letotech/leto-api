import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from 'src/app/user/dto/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService        
    ){}
    @Post('login')
    signIn(@Body() payload: SignInDto): Promise<any>{
        return this.authService.signIn(payload)
    }
}
