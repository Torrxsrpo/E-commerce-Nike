import { Order } from '../entities/order.entity.js';

export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

export interface OrderRepositoryPort {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
}
