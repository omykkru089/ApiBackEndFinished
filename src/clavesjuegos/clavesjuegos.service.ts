import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ClaveJuego } from './entities/clavesjuegos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClaveJuegoDto } from './dto/update-clavesjuegos.dto';
import { CreateClaveJuegoDto } from './dto/create-clavesjuegos.dto';


@Injectable()
export class ClavesJuegosService {

  constructor (
    @InjectRepository(ClaveJuego)
    private readonly clavesjuegosRepository: Repository<ClaveJuego>
  
  ) {}

  async create(createClavesJuegosDto: CreateClaveJuegoDto) {
    return await this.clavesjuegosRepository.save(createClavesJuegosDto);
  }

async findOneByClave(clave: string): Promise<ClaveJuego> {
    return await this.clavesjuegosRepository.findOneBy({ clave });
  }

  async findAll() {
    return await this.clavesjuegosRepository.find();
  }

  async findOne(id: number) {
    return await this.clavesjuegosRepository.findOneBy({id});
  }

  async update(id: number, updateClavesJuegosDto: UpdateClaveJuegoDto) {
    return await this.clavesjuegosRepository.update(id, updateClavesJuegosDto);
  }

  async remove(id: number) {
    return await this.clavesjuegosRepository.delete({ id });
  }

  async findLibrePorJuego(juegoId: number): Promise<ClaveJuego | null> {
  return await this.clavesjuegosRepository.findOne({
    where: { juego: { id: juegoId }, estado: 'libre' },
    relations: ['juego'],
  });
}
}
