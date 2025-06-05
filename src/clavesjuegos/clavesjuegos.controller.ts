import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ClavesJuegosService } from './clavesjuegos.service';
import { CreateClaveJuegoDto } from './dto/create-clavesjuegos.dto';
import { UpdateClaveJuegoDto } from './dto/update-clavesjuegos.dto';
import { ValidationPipe } from '@nestjs/common';
import { Auth } from '../auth/Decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum'; // Asegúrate de que la ruta sea correcta

 // Asegúrate de importar el decorador Auth y el enum Role
@Controller('clavesjuegos')
export class ClavesJuegosController {
  constructor(private readonly clavesJuegosService: ClavesJuegosService) {}

@Auth(Role.ADMIN)
@Post('bulk')
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  claves: CreateClaveJuegoDto[]
) {
  return Promise.all(claves.map(clave => this.clavesJuegosService.create(clave)));
}

@Auth(Role.ADMIN)
  @Post()
  create(@Body() createClaveJuegoDto: CreateClaveJuegoDto) {
    return this.clavesJuegosService.create(createClaveJuegoDto);
  }
@Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.clavesJuegosService.findAll();
  }
@Auth(Role.USER)
  @Get(':id')
findOne(@Param('id') id: string) {
  const numId = Number(id);
  if (isNaN(numId)) {
    throw new BadRequestException('El id debe ser un número válido');
  }
  return this.clavesJuegosService.findOne(numId);
}
@Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaveJuegoDto: UpdateClaveJuegoDto) {
    return this.clavesJuegosService.update(+id, updateClaveJuegoDto);
  }
@Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clavesJuegosService.remove(+id);
  }


}