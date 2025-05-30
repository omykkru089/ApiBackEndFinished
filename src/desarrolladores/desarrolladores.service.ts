import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDesarrolladoreDto } from './dto/create-desarrolladore.dto';
import { UpdateDesarrolladoreDto } from './dto/update-desarrolladore.dto';
import { Desarrolladore } from './entities/desarrolladore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DesarrolladoresService {

  constructor (
    @InjectRepository(Desarrolladore)
    private readonly desarrolladorRepository: Repository<Desarrolladore>
  
  ) {}
  async create(createDesarrolladoreDto: CreateDesarrolladoreDto) {
    return await this.desarrolladorRepository.save(createDesarrolladoreDto);
  }

async findOneByName(nombre: string): Promise<Desarrolladore> {
    return await this.desarrolladorRepository.findOneBy({ nombre });
  }

  async findAll() {
    return await this.desarrolladorRepository.find();
  }

  async findOne(id: number) {
    return await this.desarrolladorRepository.findOneBy({id});
  }

  async update(id: number, updateDesarrolladoreDto: UpdateDesarrolladoreDto) {
    return await this.desarrolladorRepository.update(id, updateDesarrolladoreDto);
  }

  async remove(id: number) {
    return await this.desarrolladorRepository.delete({ id });
  }

  async deleteAllDesarrollador(){
    const query = this.desarrolladorRepository.createQueryBuilder('desarrollador');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin desarrollador ...')
    }
  }
}
