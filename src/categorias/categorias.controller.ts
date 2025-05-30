import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  const numId = Number(id);
  if (isNaN(numId)) {
  throw new BadRequestException('El id debe ser un número válido');
}
  return this.categoriasService.findOne(numId);
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }

  @Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  categorias: CreateCategoriaDto[]
) {
  return Promise.all(categorias.map(categoria => this.categoriasService.create(categoria)));
}
}
