import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength, ValidateIf } from "class-validator"
import { Gender } from "../../../shared/enums/gender.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    firstName: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    last_name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @ValidateIf((object, value) => object.cpf)
    @Length(11, 11, { message: 'CPF deve conter onze caracteres' })
    @IsNotEmpty()
    cpf: string;

    @IsOptional()
    phone?: string

    @IsEnum(Gender, { message: '1 = female | 2 - male | 3 - others'})
    @IsOptional()
    gender?: number

    @IsOptional()
    @IsString()
    birthDate?: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long'})
    password: string

    @IsString()
    @MaxLength(150)
    @IsOptional()
    street?: string

    @IsString()
    @MaxLength(100)
    @IsOptional()
    district?: string

    @IsNumber()
    @MaxLength(20)
    @IsOptional()
    number?: number

    @IsString()
    @MaxLength(100)
    @IsOptional()
    city?: string

    @IsString()
    @MaxLength(150)
    @IsOptional()
    state?: string

    @IsString()
    @MaxLength(150)
    @IsOptional()
    country?: string

    @IsString()
    @MaxLength(20)
    @IsOptional()
    postalCode?: string
}