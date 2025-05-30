import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) , forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule,UsersService],
})
export class UsersModule {}
