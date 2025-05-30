import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }
  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
  @Auth(Role.USER)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }

  @Post('bulk')
@Auth(Role.ADMIN)
createBulk(
  @Body(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  users: CreateUserDto[]
) {
  return Promise.all(users.map(user => this.usersService.create(user)));
}
}
