import { IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { BedStatus } from "../../../shared/enums/bedStatus.enum";

export class FindBedDto {
    @IsString()
    @IsOptional()
    bedCode?: string;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    roomsId?: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    organizationId?: number;

    @IsEnum(BedStatus)
    @IsOptional()
    @Type(() => Number)
    bedStatus?: BedStatus;
}