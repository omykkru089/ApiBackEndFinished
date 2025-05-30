import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinTable } from 'typeorm';
import { Juego } from '../../juegos/entities/juego.entity';

@Entity()
export class ClaveJuego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clave: string;

  @Column({ type: 'enum', enum: ['libre', 'pendiente', 'comprado', 'devuelto'], default: 'libre' })
  estado: string;

  @ManyToOne(() => Juego, (juego) => juego.claves, { eager: true, onDelete: 'CASCADE' })
  juego: Juego;
}