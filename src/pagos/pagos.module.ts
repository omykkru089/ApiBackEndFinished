import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { ClavesJuegosModule } from '../clavesjuegos/clavesjuegos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Module({
  imports: [
    ClavesJuegosModule,
    TypeOrmModule.forFeature([Pedido]) // <-- AÑADE ESTA LÍNEA
  ],
  controllers: [PagosController],
})
export class PagosModule {}