import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './entities/juego.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Plataforma } from '../plataformas/entities/plataforma.entity';
import { Editoriale } from '../editoriales/entities/editoriale.entity';
import { Desarrolladore } from '../desarrolladores/entities/desarrolladore.entity';

@Injectable()
export class JuegosService {

  constructor (
    @InjectRepository(Juego)
    private readonly juegoRepository: Repository<Juego>,
    
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Plataforma)
    private readonly plataformaRepository: Repository<Plataforma>,
    @InjectRepository(Editoriale)
    private readonly editorialRepository: Repository<Editoriale>,
    @InjectRepository(Desarrolladore)
    private readonly desarrolladorRepository: Repository<Desarrolladore>,
  ) {}


  
  async create(createJuegoDto: CreateJuegoDto) {
    // Buscar la categoría por ID
  const categoria = await this.categoriaRepository.findOneBy({
    id: +createJuegoDto.categoria, // Convertir a número si es necesario
  });

  if (!categoria) {
    throw new BadRequestException(`Categoría con ID "${createJuegoDto.categoria}" no encontrada`);
  }

  // Buscar la plataforma por ID
  const plataforma = await this.plataformaRepository.findOneBy({
    id: +createJuegoDto.plataforma,
  });

  if (!plataforma) {
    throw new BadRequestException(`Plataforma con ID "${createJuegoDto.plataforma}" no encontrada`);
  }

  // Buscar la editorial por ID
  const editorial = await this.editorialRepository.findOneBy({
    id: +createJuegoDto.editorial,
  });

  if (!editorial) {
    throw new BadRequestException(`Editorial con ID "${createJuegoDto.editorial}" no encontrada`);
  }

  // Buscar el desarrollador por ID
  const desarrollador = await this.desarrolladorRepository.findOneBy({
    id: +createJuegoDto.desarrollador,
  });

  if (!desarrollador) {
    throw new BadRequestException(`Desarrollador con ID "${createJuegoDto.desarrollador}" no encontrado`);
  }

  // Crear el juego con las relaciones encontradas
  const juego = this.juegoRepository.create({
    ...createJuegoDto,
    categoria,
    plataforma,
    editorial,
    desarrollador,
  });

  return this.juegoRepository.save(juego);
}
async findAll() {
  return await this.juegoRepository.find({ relations: ['categoria', 'plataforma', 'editorial', 'desarrollador'] });
}

  async findOne(id: number) {
    return await this.juegoRepository.findOneBy({id});
  }

  // Nuevo método para buscar por link
  async findOneByLink(link: string): Promise<Juego> {
    const juego = await this.juegoRepository
      .createQueryBuilder('juego')
      .leftJoinAndSelect('juego.categoria', 'categoria') // Incluye la relación con categoría
      .leftJoinAndSelect('juego.plataforma', 'plataforma') // Incluye la relación con plataforma
      .leftJoinAndSelect('juego.editorial', 'editorial') // Incluye la relación con editorial
      .leftJoinAndSelect('juego.desarrollador', 'desarrollador') // Incluye la relación con desarrollador
      .where('JSON_UNQUOTE(JSON_EXTRACT(juego.link, "$[0]")) = :link', { link }) // Elimina las comillas dobles del valor extraído
      .getOne();
  
    if (!juego) {
      throw new NotFoundException(`Juego con link "${link}" no encontrado`);
    }
  
    return juego;
  }

  async update(id: number, updateJuegoDto: UpdateJuegoDto) {
    // Busca el juego existente
    const juego = await this.juegoRepository.findOneBy({ id });
    if (!juego) {
      throw new NotFoundException(`Juego con ID ${id} no encontrado`);
    }
  
    // Procesa los campos relacionados
    if (updateJuegoDto.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: +updateJuegoDto.categoria,
      });
      if (!categoria) {
        throw new BadRequestException(`Categoría con ID "${updateJuegoDto.categoria}" no encontrada`);
      }
      juego.categoria = categoria;
    }
  
    if (updateJuegoDto.plataforma) {
      const plataforma = await this.plataformaRepository.findOneBy({
        id: +updateJuegoDto.plataforma,
      });
      if (!plataforma) {
        throw new BadRequestException(`Plataforma con ID "${updateJuegoDto.plataforma}" no encontrada`);
      }
      juego.plataforma = plataforma;
    }
  
    if (updateJuegoDto.editorial) {
      const editorial = await this.editorialRepository.findOneBy({
        id: +updateJuegoDto.editorial,
      });
      if (!editorial) {
        throw new BadRequestException(`Editorial con ID "${updateJuegoDto.editorial}" no encontrada`);
      }
      juego.editorial = editorial;
    }
  
    if (updateJuegoDto.desarrollador) {
      const desarrollador = await this.desarrolladorRepository.findOneBy({
        id: +updateJuegoDto.desarrollador,
      });
      if (!desarrollador) {
        throw new BadRequestException(`Desarrollador con ID "${updateJuegoDto.desarrollador}" no encontrado`);
      }
      juego.desarrollador = desarrollador;
    }
  
    // Actualiza los campos restantes
    Object.assign(juego, updateJuegoDto);
  
    // Guarda los cambios
    return await this.juegoRepository.save(juego);
  }

  async remove(id: number) {
    return await this.juegoRepository.delete({ id });
  }

  async deleteAllJuegos(){
    try {
    await this.juegoRepository.createQueryBuilder().delete().execute();
    return { message: 'Todas las categorías han sido eliminadas' };
  } catch (error) {
    throw new InternalServerErrorException('Error al eliminar todas las categorías');
  }
}
}
