import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.pedidos, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column()
  estado: string;
  
  @OneToMany(() => Carrito, carrito => carrito.pedido, { cascade: true })
  carritoItems: Carrito[];

}