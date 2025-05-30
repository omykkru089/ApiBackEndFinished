import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PlataformasService } from './plataformas.service';
import { CreatePlataformaDto } from './dto/create-plataforma.dto';
import { UpdatePlataformaDto } from './dto/update-plataforma.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('plataformas')
export class PlataformasController {
  constructor(private readonly plataformasService: PlataformasService) {}

  @Post()
  create(@Body() createPlataformaDto: CreatePlataformaDto) {
    return this.plataformasService.create(createPlataformaDto);
  }

  @Get()
  findAll() {
    return this.plataformasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plataformasService.findOne(+id);
  }

  @Patch(':id')
update(@Param('id') id: string, @Body() updatePlataformaDto: UpdatePlataformaDto) {
  return this.plataformasService.update(+id, updatePlataformaDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plataformasService.remove(+id);
  }

@Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  plataformas: CreatePlataformaDto[]
) {
  return Promise.all(plataformas.map(plataforma => this.plataformasService.create(plataforma)));
}

}
