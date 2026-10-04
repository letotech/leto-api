import { IsInt, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { BedStatus } from "../../../shared/enums/bedStatus.enum";

export class CreateBedDto {
    @IsString()
    @IsNotEmpty({ message: 'O código do leito é obrigatório' })
    bedCode: string;

    @IsInt()
    @IsNotEmpty({message: 'O ID da ala/setor é obrigatório'})
    unitsId: number;

    @IsInt()
    @IsNotEmpty({message: 'O ID do quarto é obrigatório'})
    roomsId: number;

    @IsInt()
    @IsNotEmpty({message: 'O ID da organização é obrigatório'})
    organizationId: number;

    @IsInt()
    @IsOptional()
    patientsId?: number;

    @IsEnum(BedStatus)
    @IsOptional()
    bedStatus?: BedStatus;

    @IsString()
    @IsOptional()
    iotMacAddress?: string;
}