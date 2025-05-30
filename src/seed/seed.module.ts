import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { JuegosModule } from 'src/juegos/juegos.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { DesarrolladoresModule } from 'src/desarrolladores/desarrolladores.module';
import { EditorialesModule } from 'src/editoriales/editoriales.module';
import { PlataformasModule } from 'src/plataformas/plataformas.module';
import { ClavesJuegosModule } from 'src/clavesjuegos/clavesjuegos.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ AuthModule,
    JuegosModule,CategoriasModule,DesarrolladoresModule,EditorialesModule,PlataformasModule,ClavesJuegosModule
  ]
})
export class SeedModule {}
