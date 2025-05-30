import { Injectable } from '@nestjs/common';

import * as seedJuegos from './data/juegos.json';
import * as seedCategorias from './data/categoria.json';
import * as seedPlataforma from './data/plataforma.json';
import * as seedDesarrollador from './data/desarroladores.json';
import * as seedEditorial from './data/editorial.json'
import * as seedClavesJuegos from './data/clavesjuegos.json';

import { CategoriasService } from 'src/categorias/categorias.service';
import { DesarrolladoresService } from 'src/desarrolladores/desarrolladores.service';
import { EditorialesService } from 'src/editoriales/editoriales.service';
import { CreateJuegoDto } from 'src/juegos/dto/create-juego.dto';
import { JuegosService } from 'src/juegos/juegos.service';
import { PlataformasService } from 'src/plataformas/plataformas.service';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Editoriale } from 'src/editoriales/entities/editoriale.entity';
import { ClavesJuegosService } from 'src/clavesjuegos/clavesjuegos.service';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Desarrolladore } from 'src/desarrolladores/entities/desarrolladore.entity';
@Injectable()
export class SeedService {

    constructor (
        private readonly juegoService: JuegosService,
        private readonly categoriaService: CategoriasService,
        private readonly plataformaService: PlataformasService,
        private readonly editorialService: EditorialesService,
        private readonly desarrolladorService: DesarrolladoresService,
        private readonly clavesJuegosService: ClavesJuegosService,

    ){}

    public async loadData(){
  // Borra en orden correcto (hijos -> padres)
  await this.juegoService.deleteAllJuegos();
  await this.categoriaService.deleteAllCategoria();
  await this.plataformaService.deleteAllPlataforma();
  await this.editorialService.deleteAllEditorial();
  await this.desarrolladorService.deleteAllDesarrollador();

  // Reinicia las secuencias de cada tabla
  await this.categoriaService['categoriaRepository'].query('ALTER SEQUENCE categoria_id_seq RESTART WITH 1');
  await this.plataformaService['plataformaRepository'].query('ALTER SEQUENCE plataforma_id_seq RESTART WITH 1');
  await this.editorialService['editorialRepository'].query('ALTER SEQUENCE editoriale_id_seq RESTART WITH 1');
  await this.desarrolladorService['desarrolladorRepository'].query('ALTER SEQUENCE desarrolladore_id_seq RESTART WITH 1');
  await this.juegoService['juegoRepository'].query('ALTER SEQUENCE juego_id_seq RESTART WITH 1');
  await this.clavesJuegosService['clavesjuegosRepository'].query('ALTER SEQUENCE clave_juego_id_seq RESTART WITH 1');

  // Ahora sí, inserta los datos
  await this.insertNewCategorias();
  await this.insertNewPlataformas();
  await this.insertNewEditoriales();
  await this.insertNewDesarrolladores();
  await this.insertNewJuegos();
  await this.insertNewClavesJuegos();
}


      private async insertNewJuegos() {
    await this.juegoService.deleteAllJuegos(); // <--- Esto primero
        const insertPromisesJuegos = [];
      
        for (const juego of seedJuegos) {
          // Procesar campos relacionados
          const categoria = await this.categoriaService.findOneByName(juego.categoria);
          if (!categoria) {
            console.error(`Categoría no encontrada para el juego:`, juego);
            throw new Error(`Categoría "${juego.categoria}" no encontrada`);
          }
      
          const plataforma = await this.plataformaService.findOneByName(juego.plataforma);
          if (!plataforma) {
            throw new Error(`Plataforma "${juego.plataforma}" no encontrada`);
          }
      
          const editorial = await this.editorialService.findOneByName(juego.editorial);
          if (!editorial) {
            throw new Error(`Editorial "${juego.editorial}" no encontrada`);
          }
      
          const desarrollador = await this.desarrolladorService.findOneByName(juego.desarrollador);
          if (!desarrollador) {
            throw new Error(`Desarrollador "${juego.desarrollador}" no encontrado`);
          }
      
          // Crear el juego con los datos procesados
          const newJuego: CreateJuegoDto = {
            ...juego,
            link: juego.link, // Pasa el array directamente
            categoria: categoria.id,
            plataforma: plataforma.id,
            editorial: editorial.id,
            desarrollador: desarrollador.id,
          };
      
          insertPromisesJuegos.push(this.juegoService.create(newJuego));
        }
      
        await Promise.all(insertPromisesJuegos); // Inserta todos los juegos
      }
      
      private async insertNewDesarrolladores() {
  await this.desarrolladorService.deleteAllDesarrollador(); // Limpia los desarrolladores existentes
  const insertPromisesDesarrolladores = [];

  seedDesarrollador.forEach((desarrollador: Desarrolladore) => {
    insertPromisesDesarrolladores.push(this.desarrolladorService.create(desarrollador));
  });
  await Promise.all(insertPromisesDesarrolladores); // Inserta todos los desarrolladores
}

      private async insertNewCategorias() {
    await this.categoriaService.deleteAllCategoria();
        const insertPromisesCategorias = []; 
        seedCategorias.forEach( (categoria: Categoria)  => {
              insertPromisesCategorias.push(this.categoriaService.create(categoria));
            });
        await Promise.all(insertPromisesCategorias); // Inserta todas las categorías
      }
      
      
      private async insertNewPlataformas(){
            await this.plataformaService.deleteAllPlataforma();
            const insertPromisesPlataformas = [];
            seedPlataforma.forEach( (plataforma: Plataforma)  => {
              insertPromisesPlataformas.push(this.plataformaService.create(plataforma));
            });
        }
      
      private async insertNewEditoriales(){
        await this.editorialService.deleteAllEditorial();
        const insertPromisesEditoriales = [];
        seedEditorial.forEach( (editorial: Editoriale)  => {
          insertPromisesEditoriales.push(this.editorialService.create(editorial));
        });
      }
      
      private async insertNewClavesJuegos() {
    const insertPromises = [];
    for (const clave of seedClavesJuegos) {
      insertPromises.push(this.clavesJuegosService.create(clave));
    }
    await Promise.all(insertPromises);
  }
      
}

