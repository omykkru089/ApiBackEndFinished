import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";

export class RegisterDto {
    @IsNumber()
    @IsOptional()
    id?: string;
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    nombre: string;
    @IsEmail()
    email:string;
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password:string;
}