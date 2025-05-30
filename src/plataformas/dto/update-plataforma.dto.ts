import { PartialType } from '@nestjs/mapped-types';
import { CreatePlataformaDto } from './create-plataforma.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePlataformaDto {
    @IsString()
    @IsOptional()
    nombre: string;
  
    @IsString()
    @IsOptional()
    descripcion: string;
  
    @IsString()
    @IsOptional()
    fundador: string;
  
    @IsString()
    @IsOptional()
    anio_de_lanzamiento: string;
  
    @IsString()
    @IsOptional()
    tipos_de_medios_compatibles: string;
  
    @IsString()
    @IsOptional()
    dispositivos: string;
  }