import { Pedido } from '../pedidos/entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { ClavesJuegosService } from '../clavesjuegos/clavesjuegos.service';

@Controller('pagos')
export class PagosController {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-04-30.basil' }); // <-- AÑADE ESTA LÍNEA

  constructor(
    private readonly clavesJuegosService: ClavesJuegosService,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  @Post('checkout')
async createCheckout(@Body() body: { items: any[], userId: number }) {
  // ...validaciones y lógica...
  const session = await this.stripe.checkout.sessions.create({
    payment_method_types: ['card','sofort','klarna'],
    mode: 'payment',
    line_items: body.items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.nombre },
        unit_amount: Math.round(Number(item.precio) * 100),
      },
      quantity: item.cantidad,
    })),
    success_url: `gameshop-flax.vercel.app/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'gameshop-flax.vercel.app/carrito',
    metadata: {
      userId: body.userId,
      items: JSON.stringify(body.items.map(i => ({ id: i.id, cantidad: i.cantidad }))),
    },
  });
  return { sessionId: session.id };
}

  // Nuevo endpoint para asignar claves tras el pago
  @Post('asignar-claves')
async asignarClaves(@Body() body: { userId: number }) {
  // Busca el pedido pendiente más reciente del usuario
  const pedido = await this.pedidoRepository.findOne({
    where: { user: { id: body.userId }, estado: 'pendiente' },
    order: { fecha_creacion: 'DESC' },
    relations: ['carritoItems', 'carritoItems.juego'],
  });
  if (!pedido) throw new NotFoundException('No hay pedido pendiente para este usuario');

  // Cambia el estado a 'pagado'
  pedido.estado = 'pagado';
  await this.pedidoRepository.save(pedido);

  // Asigna claves
  const clavesPorJuego: Record<number, string[]> = {};
  for (const item of pedido.carritoItems) {
    clavesPorJuego[item.juego.id] = [];
    for (let i = 0; i < item.cantidad; i++) {
      const clave = await this.clavesJuegosService.findLibrePorJuego(item.juego.id);
      if (!clave) throw new NotFoundException(`No hay claves disponibles para el juego ${item.juego.id}`);
      await this.clavesJuegosService.update(clave.id, { estado: 'comprado' });
      clavesPorJuego[item.juego.id].push(clave.clave);
    }
  }

  // Elimina el pedido (y por cascada, el carrito)
  await this.pedidoRepository.remove(pedido);

  return clavesPorJuego;
}
}