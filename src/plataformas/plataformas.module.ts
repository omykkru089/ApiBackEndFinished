import { Module } from '@nestjs/common';
import { PlataformasService } from './plataformas.service';
import { PlataformasController } from './plataformas.controller';
import { Plataforma } from './entities/plataforma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plataforma])],
  controllers: [PlataformasController],
  providers: [PlataformasService],
  exports: [TypeOrmModule, PlataformasService]
})
export class PlataformasModule {}
