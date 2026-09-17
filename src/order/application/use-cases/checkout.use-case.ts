import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import type { CartRepositoryPort } from '../../../cart/domain/ports/cart-repository.port.js';
import type { ProductRepositoryPort } from '../../../product/domain/ports/product-repository.port.js';
import { Order } from '../../domain/entities/order.entity.js';
import { OrderItem } from '../../domain/entities/order-item.entity.js';
import type { OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { CartNotFoundError } from '../errors/cart-not-found.error.js';
import { EmptyCartError } from '../errors/empty-cart.error.js';
import { VariantNotFoundError } from '../errors/variant-not-found.error.js';

export interface CheckoutInput {
  cartId: string;
  contactName: string;
  contactEmail: string;
}

@Injectable()
export class CheckoutUseCase {
  constructor(
    private readonly cartRepository: CartRepositoryPort,
    private readonly productRepository: ProductRepositoryPort,
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(input: CheckoutInput): Promise<Order> {
    const cart = await this.cartRepository.findById(input.cartId);

    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }

    if (cart.items.length === 0) {
      throw new EmptyCartError(input.cartId);
    }

    const orderId = randomUUID();
    const orderItems: OrderItem[] = [];

    for (const cartItem of cart.items) {
      const product = await this.productRepository.findByVariantId(cartItem.variantId);

      if (!product) {
        throw new VariantNotFoundError(cartItem.variantId);
      }

      orderItems.push(
        new OrderItem({
          id: randomUUID(),
          orderId,
          variantId: cartItem.variantId,
          quantity: cartItem.quantity,
          unitPrice: product.basePrice,
          productNameSnapshot: product.name,
        }),
      );
    }

    const order = new Order({
      id: orderId,
      contactName: input.contactName,
      contactEmail: input.contactEmail,
      status: 'PENDING',
      createdAt: new Date(),
      items: orderItems,
    });

    return this.orderRepository.save(order);
  }
}
