import { Module } from '@nestjs/common';
import { DesarrolladoresService } from './desarrolladores.service';
import { DesarrolladoresController } from './desarrolladores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desarrolladore } from './entities/desarrolladore.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Desarrolladore]), AuthModule],
  controllers: [DesarrolladoresController],
  providers: [DesarrolladoresService],
  exports: [TypeOrmModule, DesarrolladoresService]
})
export class DesarrolladoresModule {}
