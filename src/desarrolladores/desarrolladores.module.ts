import { Module } from '@nestjs/common';
import { DesarrolladoresService } from './desarrolladores.service';
import { DesarrolladoresController } from './desarrolladores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desarrolladore } from './entities/desarrolladore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desarrolladore])],
  controllers: [DesarrolladoresController],
  providers: [DesarrolladoresService],
  exports: [TypeOrmModule, DesarrolladoresService]
})
export class DesarrolladoresModule {}
