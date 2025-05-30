import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { ClavesJuegosModule } from '../clavesjuegos/clavesjuegos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClavesJuegosModule,
    TypeOrmModule.forFeature([Pedido]), AuthModule // <-- AÑADE ESTA LÍNEA
  ],
  controllers: [PagosController],
})
export class PagosModule {}