import { Module } from '@nestjs/common';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';
import { Editoriale } from './entities/editoriale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Editoriale])],
  controllers: [EditorialesController],
  providers: [EditorialesService],
  exports: [TypeOrmModule, EditorialesService]
})
export class EditorialesModule {}
