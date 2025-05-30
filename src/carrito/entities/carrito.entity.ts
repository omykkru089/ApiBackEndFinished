import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Juego } from '../../juegos/entities/juego.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Entity()
export class Carrito {
    
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.carritoItems, { onDelete: 'CASCADE' })
  pedido: Pedido;

  @ManyToOne(() => Juego, juego => juego.id)
  juego: Juego;

  @Column({ default: 1 })
  cantidad: number;
  
}