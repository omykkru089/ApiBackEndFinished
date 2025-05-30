import { Juego } from "src/juegos/entities/juego.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @OneToMany(() => Juego, (juego) => juego.categoria)
    juegos: Juego[];

    
    
}
