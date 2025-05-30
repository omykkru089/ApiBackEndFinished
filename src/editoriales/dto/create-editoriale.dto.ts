import { IsString } from "class-validator";

export class CreateEditorialeDto {
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsString()
    pais_origen: string;
    @IsString()
    anio_fundacion: string;
    @IsString()
    sitio_web: string;
}
