import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './entities/carrito.entity';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { UsersModule } from 'src/users/users.module';
import { Juego } from 'src/juegos/entities/juego.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito,Juego ]),  forwardRef(() => PedidosModule), forwardRef(() => UsersModule),AuthModule],
  providers: [CarritoService],
  controllers: [CarritoController],
  exports: [TypeOrmModule, CarritoService]
})
export class CarritoModule {}
