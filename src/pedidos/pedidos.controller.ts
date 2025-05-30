import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';


@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
@Auth(Role.USER)
async addToPedido(
  @Body('userId') userId: number,
  @Body('fecha_creacion') fecha_creacion: Date,
  @Body('estado') estado: string,
) {
  if (!userId || !fecha_creacion || !estado) {
    throw new BadRequestException('Faltan datos requeridos para crear el pedido');
  }
  return this.pedidosService.addToPedido(userId, fecha_creacion, estado);
}

  @Get(':userId')
@UseGuards(AuthGuard)
async getPedidos(@Param('userId') userId: number) {
  return this.pedidosService.getPedidosByUser(userId);
}

// Nuevo endpoint para obtener todos los pedidos (solo para admins)
@Get('admin')
@Auth(Role.ADMIN)
async getAllPedidos() {
  return this.pedidosService.findAllPedidos();
}

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePedido(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.pedidosService.deletePedido(id, userId);
  }

  @Delete('pendiente/usuario')
@UseGuards(AuthGuard)
async deletePedidoPendiente(@Req() req) {
  const userId = req.user.id;
  return this.pedidosService.deletePedidoPendienteByUser(userId);
}
}
