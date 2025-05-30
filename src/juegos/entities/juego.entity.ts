import { Column, Entity, OneToMany, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Plataforma } from '../../plataformas/entities/plataforma.entity';
import { Editoriale } from '../../editoriales/entities/editoriale.entity';
import { Desarrolladore } from '../../desarrolladores/entities/desarrolladore.entity';
import { ClaveJuego } from '../../clavesjuegos/entities/clavesjuegos.entity';
@Entity()
export class Juego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('json') // Cambiado a JSON
  descripcion: string[];

  @ManyToOne(() => Categoria, (categoria) => categoria.nombre, { eager: true })
  categoria: Categoria;

  @ManyToOne(() => Plataforma, (plataforma) => plataforma.nombre, { eager: true })
  plataforma: Plataforma;

  @ManyToOne(() => Editoriale, (editorial) => editorial.nombre, { eager: true })
  editorial: Editoriale;

  @ManyToOne(() => Desarrolladore, (desarrolladore) => desarrolladore.nombre, { eager: true })
  desarrollador: Desarrolladore;

  @Column({ type: 'enum', enum: ['PC', 'Xbox', 'Playstation', 'Nintendo'], default: 'PC' })
  dispositivo: string;

  @Column()
  precio: string;

  @Column()
  fecha_de_lanzamiento: string;

  @Column() // Cambiado a JSON
  clasificacion_por_edad: string;

  @Column('json') // Cambiado a JSON
  idiomas: string[];

  @Column('json') // Cambiado a JSON
  imagen_de_portada: string[];

  @Column('json') // Cambiado a JSON
  video: string[];

  @Column('json') // Cambiado a JSON
  requisitos_del_sistema: string[];

  @Column()
  popularidad: string;

  @Column('json') // Cambiado a JSON})
  link: string[];

  @OneToMany(() => ClaveJuego, (clave) => clave.juego)
  claves: ClaveJuego[];
}