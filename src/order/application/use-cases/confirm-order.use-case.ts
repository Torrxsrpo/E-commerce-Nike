import { Injectable } from '@nestjs/common';
import type { ProductRepositoryPort } from '../../../product/domain/ports/product-repository.port.js';
import { Order } from '../../domain/entities/order.entity.js';
import type { OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { OrderNotFoundError } from '../errors/order-not-found.error.js';
import { VariantNotFoundError } from '../errors/variant-not-found.error.js';

@Injectable()
export class ConfirmOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    for (const item of order.items) {
      const product = await this.productRepository.findByVariantId(item.variantId);

      if (!product) {
        throw new VariantNotFoundError(item.variantId);
      }

      const variant = product.getVariantById(item.variantId)!;
      variant.decreaseStock(item.quantity);

      await this.productRepository.save(product);
    }

    order.changeStatus('CONFIRMED');

    return this.orderRepository.save(order);
  }
}
