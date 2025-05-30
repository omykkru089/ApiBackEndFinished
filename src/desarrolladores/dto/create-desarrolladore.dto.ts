import { IsOptional, IsString } from "class-validator";

export class CreateDesarrolladoreDto {


    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsString()
    @IsOptional()
    pais_origen?: string;
    @IsString()
    @IsOptional()
    anio_fundacion?: string;
    @IsString()
    @IsOptional()
    sitio_web?: string;
}
