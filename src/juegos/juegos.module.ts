import { Module } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { JuegosController } from './juegos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Juego } from './entities/juego.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Editoriale } from 'src/editoriales/entities/editoriale.entity';
import { Desarrolladore } from 'src/desarrolladores/entities/desarrolladore.entity';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { PlataformasModule } from 'src/plataformas/plataformas.module';
import { DesarrolladoresModule } from 'src/desarrolladores/desarrolladores.module';
import { EditorialesModule } from 'src/editoriales/editoriales.module';
import { UsersModule } from 'src/users/users.module';
import { PedidosModule } from 'src/pedidos/pedidos.module';
import { CarritoModule } from 'src/carrito/carrito.module';

@Module({
  imports: [TypeOrmModule.forFeature([Juego, Categoria, Plataforma, Editoriale, Desarrolladore]),
  CategoriasModule,PlataformasModule,DesarrolladoresModule,EditorialesModule,UsersModule,PedidosModule,CarritoModule
  ],
  controllers: [JuegosController],
  providers: [JuegosService],
  exports: [TypeOrmModule, JuegosService]
})
export class JuegosModule {}
