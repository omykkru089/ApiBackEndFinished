import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClaveJuegoDto {
    @IsString()
    clave: string;
    @IsString()
    estado: string;
    @IsNumber()
    @IsOptional()
    juego_id?: number; // Añadir esta propiedad
}
