import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards, Patch } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('carrito')
@UseGuards(AuthGuard) // Proteger todas las rutas con autenticación
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  async addToCarrito(
    @Req() req,
    @Body('juegoId') juegoId: number,
    @Body('cantidad') cantidad: number,
  ) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.carritoService.addToCarrito(userId, juegoId, cantidad);
  }

  @Get()
  async getCarrito(@Req() req) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.carritoService.getCarritoByPedido(userId);
  }

  // Nuevo endpoint para obtener todos los carritos (solo para admins)
  @Get('admin')
  @Auth(Role.ADMIN)
  async getAllCarritos() {
    return this.carritoService.findAllCarritos();
  }

  // Nuevo endpoint para que los administradores eliminen registros del carrito
  @Delete('admin/:id')
  @Auth(Role.ADMIN)
  async deleteCarritoAsAdmin(@Param('id') carritoId: number) {
    return this.carritoService.deleteCarritoAsAdmin(carritoId);
  }

  @Patch('admin/:id')
@Auth(Role.ADMIN)
async updateCarritoCantidad(
  @Param('id') carritoId: number,
  @Body('cantidad') nuevaCantidad: number,
) {
  return this.carritoService.updateCarritoCantidad(carritoId, nuevaCantidad);
}

  @Delete(':id')
  async removeFromCarrito(@Req() req, @Param('id') carritoId: number) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.carritoService.removeFromCarrito(userId, carritoId);
  }

  @Patch(':id')
  async updateCarrito(
    @Req() req,
    @Param('id') carritoId: number,
    @Body('cantidad') cantidad: number,
  ) {
    const userId = req.user.id; // Obtener el ID del usuario autenticado
    return this.carritoService.updateCarrito(userId, carritoId, cantidad);
  }
}