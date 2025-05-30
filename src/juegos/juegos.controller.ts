import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../auth/Decorators/auth.decorator';


@Controller('juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createJuegoDto: CreateJuegoDto) {
    return this.juegosService.create(createJuegoDto);
  }


  @Get()
  findAll() {
    return this.juegosService.findAll();
  }

  // Coloca esta ruta antes de @Get(':id')
  @Get('link/:link') // Ruta para buscar por link
findOneByLink(@Param('link') link: string) {
  return this.juegosService.findOneByLink(link);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juegosService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
update(@Param('id') id: string, @Body() updateJuegoDto: UpdateJuegoDto) {
  return this.juegosService.update(+id, updateJuegoDto);
}

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juegosService.remove(+id);
  }

  @Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  juegos: CreateJuegoDto[]
) {
  return Promise.all(juegos.map(juego => this.juegosService.create(juego)));
}
}
