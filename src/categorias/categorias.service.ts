import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor (
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaRepository.save(createCategoriaDto);
  }

  async findOneByName(nombre: string): Promise<Categoria> {
    return await this.categoriaRepository.findOneBy({ nombre });
  }

async findAll() {
  return await this.categoriaRepository.find();
}

async findOne(id: number) {
  if (typeof id !== 'number' || isNaN(id) || id <= 0) {
    throw new BadRequestException('El id debe ser un número válido y mayor que 0');
  }
  return await this.categoriaRepository.findOneBy({ id });
}

async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
  return await this.categoriaRepository.update(id, updateCategoriaDto);
}

async remove(id: number) {
  return await this.categoriaRepository.delete({ id });
}

async deleteAllCategoria() {
  try {
    await this.categoriaRepository.query('ALTER TABLE categoria DISABLE TRIGGER ALL');
await this.categoriaRepository.createQueryBuilder().delete().execute();
await this.categoriaRepository.query('ALTER SEQUENCE categoria_id_seq RESTART WITH 1');
await this.categoriaRepository.query('ALTER TABLE categoria ENABLE TRIGGER ALL');
    return { message: 'Todas las categorías han sido eliminadas' };
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar todas las categorías');
  }
}
}
