import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateJuegoDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  descripcion?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  idiomas?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagen_de_portada?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  video?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requisitos_del_sistema?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  link?: string[];

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  precio?: string;

  @IsString()
  @IsOptional()
  fecha_de_lanzamiento?: string;

  @IsString()
  @IsOptional()
  clasificacion_por_edad?: string;

  @IsString()
  @IsOptional()
  popularidad?: string;

  // Campos relacionados (se reciben como strings)
  @IsString()
  @IsOptional()
  categoria?: string;

  @IsString()
  @IsOptional()
  plataforma?: string;

  @IsString()
  @IsOptional()
  editorial?: string;

  @IsString()
  @IsOptional()
  desarrollador?: string;

  @IsString()
  @IsOptional()
  dispositivo?: string;
}