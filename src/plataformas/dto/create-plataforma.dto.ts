import { IsString } from "class-validator";

export class CreatePlataformaDto {

    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsString()
    fundador: string;
    @IsString()
    anio_de_lanzamiento: string;
    @IsString()
    tipos_de_medios_compatibles: string;
    @IsString()
    dispositivos: string;
}
