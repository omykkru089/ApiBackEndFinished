import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePlataformaDto } from './dto/create-plataforma.dto';
import { UpdatePlataformaDto } from './dto/update-plataforma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plataforma } from './entities/plataforma.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlataformasService {

  constructor (
    @InjectRepository(Plataforma)
    private readonly plataformaRepository: Repository<Plataforma>
  
  ) {}

  async create(createPlataformaDto: CreatePlataformaDto) {
    return await this.plataformaRepository.save(createPlataformaDto);
  }

async findOneByName(nombre: string): Promise<Plataforma> {
    return await this.plataformaRepository.findOneBy({ nombre });
  }

  async findAll() {
    return await this.plataformaRepository.find();
  }

  async findOne(id: number) {
    return await this.plataformaRepository.findOneBy({id});
  }

  async update(id: number, updatePlataformaDto: UpdatePlataformaDto) {
    return await this.plataformaRepository.update(id, updatePlataformaDto);
  }

  async remove(id: number) {
    return await this.plataformaRepository.delete({ id });
  }

  async deleteAllPlataforma(){
    try {
    await this.plataformaRepository.createQueryBuilder().delete().execute();
    await this.plataformaRepository.query('ALTER TABLE plataforma ALTER COLUMN id RESTART WITH 1'); // Añade esta línea
    return { message: 'Todas las categorías han sido eliminadas' };
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar todas las categorías');
  }
}
}
