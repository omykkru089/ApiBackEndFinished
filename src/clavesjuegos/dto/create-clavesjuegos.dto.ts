import { IsString } from "class-validator";

export class CreateClaveJuegoDto {
    @IsString()
    clave: string;
    @IsString()
    estado: string;
}
