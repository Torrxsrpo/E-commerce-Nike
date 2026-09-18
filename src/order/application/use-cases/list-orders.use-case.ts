import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity.js';
import { ORDER_REPOSITORY, type OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';

@Injectable()
export class ListOrdersUseCase {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: OrderRepositoryPort) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
