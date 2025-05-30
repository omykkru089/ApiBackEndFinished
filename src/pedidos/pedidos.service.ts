import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPedido(userId: number, fecha_creacion: Date, estado: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const newPedido = this.pedidoRepository.create({
      user: user,
      fecha_creacion,
      estado,
    });

    return this.pedidoRepository.save(newPedido);
  }

    async addToPedido(userId: number, fecha_creacion: Date, estado: string) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
    
      const newPedido = this.pedidoRepository.create({
        user,
        fecha_creacion,
        estado,
      });
    
      return this.pedidoRepository.save(newPedido);
    }
    
    async getPedidosByUser(userId: number) {
      return this.pedidoRepository.find({
        where: { user: { id: userId } },
        relations: ['user', 'carritoItems', 'carritoItems.juego'], // Incluye las relaciones necesarias
      });
    }

    // Nueva función para obtener todos los pedidos
    async findAllPedidos() {
    return this.pedidoRepository.find({
      relations: ['user', 'carritoItems', 'carritoItems.juego'], // Incluye las relaciones necesarias
    });
  }
  
    async deletePedido(id: number, userId: number) {
      const pedido = await this.pedidoRepository.findOne({ where: { id, user: { id: userId } } });
      if (!pedido) {
        throw new NotFoundException('Pedido no encontrado');
      }
      return this.pedidoRepository.remove(pedido);
    }

    async deletePedidoPendienteByUser(userId: number) {
  const pedido = await this.pedidoRepository.findOne({
    where: { user: { id: userId }, estado: 'pendiente' },
    relations: ['carritoItems'],
  });
  if (pedido) {
    await this.pedidoRepository.remove(pedido);
    return { message: 'Pedido pendiente eliminado' };
  }
  return { message: 'No había pedido pendiente' };
}
}
