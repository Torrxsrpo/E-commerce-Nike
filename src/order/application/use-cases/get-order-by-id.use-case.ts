import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity.js';
import type { OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { OrderNotFoundError } from '../errors/order-not-found.error.js';

@Injectable()
export class GetOrderByIdUseCase {
  constructor(private readonly orderRepository: OrderRepositoryPort) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new OrderNotFoundError(orderId);
    }

    return order;
  }
}
