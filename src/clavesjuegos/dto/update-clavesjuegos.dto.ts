import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateClaveJuegoDto {
    @IsString()
    @IsOptional()
    clave?: string;
    @IsString()
    @IsOptional()
    estado?: string;
    @IsNumber()
    @IsOptional()
    juego_id?: number; // Añadir esta propiedad
}
