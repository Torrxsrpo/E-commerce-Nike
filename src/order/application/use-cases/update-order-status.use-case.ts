import { Inject, Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../domain/entities/order.entity.js';
import { ORDER_REPOSITORY, type OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { OrderNotFoundError } from '../errors/order-not-found.error.js';

export interface UpdateOrderStatusInput {
  orderId: string;
  status: OrderStatus;
}

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepositoryPort) {}

  async execute(input: UpdateOrderStatusInput): Promise<Order> {
    const order = await this.orderRepository.findById(input.orderId);

    if (!order) {
      throw new OrderNotFoundError(input.orderId);
    }

    if (input.status === 'CONFIRMED') {
      throw new Error('Use ConfirmOrderUseCase to confirm an order, since it also updates stock');
    }

    order.changeStatus(input.status);

    return this.orderRepository.save(order);
  }
}
