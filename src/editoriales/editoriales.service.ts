import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEditorialeDto } from './dto/create-editoriale.dto';
import { UpdateEditorialeDto } from './dto/update-editoriale.dto';
import { Editoriale } from './entities/editoriale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EditorialesService {

  constructor (
    @InjectRepository(Editoriale)
    private readonly editorialRepository: Repository<Editoriale>
  
  ) {}

  async create(createEditorialeDto: CreateEditorialeDto) {
    return await this.editorialRepository.save(createEditorialeDto);
  }

async findOneByName(nombre: string): Promise<Editoriale> {
    return await this.editorialRepository.findOneBy({ nombre });
  }

  async findAll() {
    return await this.editorialRepository.find();
  }

  async findOne(id: number) {
    return await this.editorialRepository.findOneBy({id});
  }

  async update(id: number, updateEditorialeDto: UpdateEditorialeDto) {
    return await this.editorialRepository.update(id, updateEditorialeDto);
  }

  async remove(id: number) {
    return await this.editorialRepository.delete({ id });
  }

  async deleteAllEditorial(){
    const query = this.editorialRepository.createQueryBuilder('editorial');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin editorial ...')
    }
  }
}
