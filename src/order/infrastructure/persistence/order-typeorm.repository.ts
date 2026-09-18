import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/entities/order.entity.js';
import { OrderRepositoryPort } from '../../domain/ports/order-repository.port.js';
import { OrderMapper } from './order.mapper.js';
import { OrderOrmEntity } from './order.orm-entity.js';

@Injectable()
export class OrderTypeOrmRepository implements OrderRepositoryPort {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repository: Repository<OrderOrmEntity>,
  ) {}

  async save(order: Order): Promise<Order> {
    const saved = await this.repository.save(OrderMapper.toOrm(order));
    const reloaded = await this.repository.findOneOrFail({ where: { id: saved.id }, relations: { items: true } });

    return OrderMapper.toDomain(reloaded);
  }

  async findById(id: string): Promise<Order | null> {
    const orm = await this.repository.findOne({ where: { id }, relations: { items: true } });

    return orm ? OrderMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Order[]> {
    const orms = await this.repository.find({ relations: { items: true } });

    return orms.map((orm) => OrderMapper.toDomain(orm));
  }
}
