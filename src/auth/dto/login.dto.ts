import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MinLength,  } from "class-validator";

export class LoginDto {
    @IsNumber()
    @IsOptional()
    id?: string;
    @IsString()
    @IsOptional()
    nombre?: string;
    @IsEmail()
    email:string;
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password:string;
    @IsString()
    @IsOptional()
    role:string;
}