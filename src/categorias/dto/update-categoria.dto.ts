import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaDto {
    @IsString()
    @IsOptional()
    nombre: string;
    @IsString()
    @IsOptional()
    descripcion: string;
}
