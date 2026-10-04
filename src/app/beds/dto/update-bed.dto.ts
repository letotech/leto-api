import { PartialType } from '@nestjs/mapped-types';
// NOTA: Se usares Swagger, deves importar o PartialType de '@nestjs/swagger' em vez do mapped-types
import { CreateBedDto } from './create-bed.dto';

export class UpdateBedDto extends PartialType(CreateBedDto) {}