import { PartialType } from '@nestjs/mapped-types';
import { CreateDesarrolladoreDto } from './create-desarrolladore.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDesarrolladoreDto {

    @IsString()
    @IsOptional()
    nombre: string;
    @IsString()
    @IsOptional()
    descripcion: string;
    @IsString()
    @IsOptional()
    pais_origen: string;
    @IsString()
    @IsOptional()
    anio_fundacion: string;
    @IsString()
    @IsOptional()
    sitio_web: string;
}

