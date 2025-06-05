import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClaveJuego } from './entities/clavesjuegos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClaveJuegoDto } from './dto/update-clavesjuegos.dto';
import { CreateClaveJuegoDto } from './dto/create-clavesjuegos.dto';
import { Juego } from '../juegos/entities/juego.entity'; // Importar la entidad Juego


@Injectable()
export class ClavesJuegosService {

  constructor (
    @InjectRepository(ClaveJuego)
    private readonly clavesjuegosRepository: Repository<ClaveJuego>,
    @InjectRepository(Juego) // Inyectar el repositorio de Juego
    private readonly juegoRepository: Repository<Juego>,
  
  ) {}

  async create(createClavesJuegosDto: CreateClaveJuegoDto) {
    const { juego_id, ...restOfDto } = createClavesJuegosDto;
    const nuevaClaveJuego = this.clavesjuegosRepository.create(restOfDto);

    if (juego_id !== undefined && juego_id !== null) {
      const juego = await this.juegoRepository.findOneBy({ id: juego_id });
      if (!juego) {
        throw new NotFoundException(`Juego con ID ${juego_id} no encontrado. No se puede crear la clave.`);
      }
      nuevaClaveJuego.juego = juego;
    } else {
      // Si juego_id no se proporciona, y tu lógica de negocio requiere que siempre haya un juego,
      // podrías lanzar un BadRequestException aquí.
      // throw new BadRequestException('Se requiere un ID de juego para crear la clave.');
    }
    return await this.clavesjuegosRepository.save(nuevaClaveJuego);
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
    const claveJuego = await this.clavesjuegosRepository.findOneBy({ id });
    if (!claveJuego) {
      throw new NotFoundException(`ClaveJuego con ID ${id} no encontrada`);
    }

    const { juego_id, ...restOfDto } = updateClavesJuegosDto;

    // Actualizar campos directos (clave, estado)
    Object.assign(claveJuego, restOfDto);

    // Si se proporciona juego_id, actualizar la relación
    if (juego_id !== undefined) {
      if (juego_id === null) { // Permitir desasociar el juego
        claveJuego.juego = null;
      } else {
        const juego = await this.juegoRepository.findOneBy({ id: juego_id });
        if (!juego) throw new NotFoundException(`Juego con ID ${juego_id} no encontrado`);
        claveJuego.juego = juego;
      }
    }
    return await this.clavesjuegosRepository.save(claveJuego);
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
