import { Juego } from "src/juegos/entities/juego.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Editoriale {


    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    pais_origen: string;
    @Column()
    anio_fundacion: string;
    @Column()
    sitio_web: string;
    @OneToMany(() => Juego, (juego) => juego.editorial)
    juegos: Juego[];

}
