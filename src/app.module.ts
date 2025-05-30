import { Module } from '@nestjs/common';
import { JuegosModule } from './juegos/juegos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { PlataformasModule } from './plataformas/plataformas.module';
import { EditorialesModule } from './editoriales/editoriales.module';
import { DesarrolladoresModule } from './desarrolladores/desarrolladores.module';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CarritoModule } from './carrito/carrito.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosController } from './pagos/pagos.controller';
import { PagosModule } from './pagos/pagos.module';
import { ClavesJuegosModule } from './clavesjuegos/clavesjuegos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "true",
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    JuegosModule,
    CategoriasModule,
    PlataformasModule,
    EditorialesModule,
    DesarrolladoresModule,
    SeedModule,
    UsersModule,
    AuthModule,
    CarritoModule,
    PedidosModule,
    ClavesJuegosModule,
    PagosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
