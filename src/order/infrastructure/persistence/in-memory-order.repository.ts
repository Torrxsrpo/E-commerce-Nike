import { Order } from '../../domain/entities/order.entity.js';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';

export class InMemoryOrderRepository implements OrderRepositoryPort {
  private readonly orders: Order[] = [];

  async save(order: Order): Promise<Order> {
    const existingIndex = this.orders.findIndex((existing) => existing.id === order.id);

    if (existingIndex === -1) {
      this.orders.push(order);
    } else {
      this.orders[existingIndex] = order;
    }

    return order;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((order) => order.id === id) ?? null;
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }
}
