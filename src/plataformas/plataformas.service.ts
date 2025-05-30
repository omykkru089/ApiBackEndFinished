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
    const query = this.plataformaRepository.createQueryBuilder('plataforma');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin plataforma ...')
    }
  }
}
