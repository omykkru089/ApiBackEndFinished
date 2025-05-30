import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { CreateEditorialeDto } from './dto/create-editoriale.dto';
import { UpdateEditorialeDto } from './dto/update-editoriale.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('editoriales')
export class EditorialesController {
  constructor(private readonly editorialesService: EditorialesService) {}

  @Post()
  create(@Body() createEditorialeDto: CreateEditorialeDto) {
    return this.editorialesService.create(createEditorialeDto);
  }

  @Get()
  findAll() {
    return this.editorialesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEditorialeDto: UpdateEditorialeDto) {
    return this.editorialesService.update(+id, updateEditorialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialesService.remove(+id);
  }

  @Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  editoriales: CreateEditorialeDto[]
) {
  return Promise.all(editoriales.map(editorial => this.editorialesService.create(editorial)));
}
}
