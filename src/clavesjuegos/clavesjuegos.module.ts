import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClavesJuegosService } from './clavesjuegos.service';
import { ClavesJuegosController } from './clavesjuegos.controller';
import { ClaveJuego } from './entities/clavesjuegos.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClaveJuego]),AuthModule],
  controllers: [ClavesJuegosController],
  providers: [ClavesJuegosService],
  exports: [TypeOrmModule,ClavesJuegosService], // Para poder inyectar en otros módulos
})
export class ClavesJuegosModule {}