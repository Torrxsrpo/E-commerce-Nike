import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY, type ProductRepositoryPort } from '../../../product/domain/ports/product-repository.port.js';
import { Order } from '../../domain/entities/order.entity.js';
import { InvalidOrderStatusTransitionError } from '../../domain/errors/invalid-order-status-transition.error.js';
import { ORDER_REPOSITORY, type OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { OrderNotFoundError } from '../errors/order-not-found.error.js';
import { VariantNotFoundError } from '../errors/variant-not-found.error.js';

@Injectable()
export class ConfirmOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepositoryPort,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    if (order.status !== 'PENDING') {
      throw new InvalidOrderStatusTransitionError(order.status, 'CONFIRMED');
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
