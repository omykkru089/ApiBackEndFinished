import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class UpdateClaveJuegoDto {
    @IsString()
    @IsOptional()
    clave?: string;
    @IsString()
    @IsOptional()
    estado?: string;
}
