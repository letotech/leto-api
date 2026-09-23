import { IsOptional } from "class-validator";

export class FindUserDto{
    @IsOptional()
    email?: string

    @IsOptional()
    phone?: string
}