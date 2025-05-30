import { IsOptional, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
    @IsOptional()
    @IsNumber()
    id?: number;
    @IsOptional()
    @IsString()
    email?:string;
    @IsOptional()
    @IsString()
    password?:string;
    @IsOptional()
    @IsString()
    nombre?: string;
    @IsOptional()
    @IsString()
    role?: string;
}
