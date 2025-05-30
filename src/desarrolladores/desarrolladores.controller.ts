import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { DesarrolladoresService } from './desarrolladores.service';
import { CreateDesarrolladoreDto } from './dto/create-desarrolladore.dto';
import { UpdateDesarrolladoreDto } from './dto/update-desarrolladore.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('desarrolladores')
export class DesarrolladoresController {
  constructor(private readonly desarrolladoresService: DesarrolladoresService) {}

  @Post()
  create(@Body() createDesarrolladoreDto: CreateDesarrolladoreDto) {
    return this.desarrolladoresService.create(createDesarrolladoreDto);
  }

  @Get()
  findAll() {
    return this.desarrolladoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desarrolladoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesarrolladoreDto: UpdateDesarrolladoreDto) {
    return this.desarrolladoresService.update(+id, updateDesarrolladoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desarrolladoresService.remove(+id);
  }

  @Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  desarrolladores: CreateDesarrolladoreDto[]
) {
  return Promise.all(desarrolladores.map(dev => this.desarrolladoresService.create(dev)));
}
}
