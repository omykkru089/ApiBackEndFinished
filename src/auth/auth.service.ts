import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}


    async register({nombre, email, password}: RegisterDto){
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
        throw new BadRequestException('Usuario ya existente');
    }

    return await this.usersService.create({
        nombre,
        email,
        password: await bcryptjs.hash(password, 10),
        role: 'user',
    });

    } 



    async login({email, password, role}: LoginDto){
        const user = await this.usersService.findOneByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('El Email es incorrecto');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Contraseña incorrecta');
        }


        const payload = {id: user.id,nombre: user.nombre , email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload)
    
        return {
            id: user.id,
            nombre: user.nombre,
            token,
            email,
            role: user.role
        };
    }


    async profile ({ email, role}: {email: string, role: string}) {
        return await this.usersService.findOneByEmail(email);
    }
}
