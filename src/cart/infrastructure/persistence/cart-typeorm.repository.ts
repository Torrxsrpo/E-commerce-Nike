import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../../domain/entities/cart.entity.js';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';
import { CartMapper } from './cart.mapper.js';
import { CartOrmEntity } from './cart.orm-entity.js';

@Injectable()
export class CartTypeOrmRepository implements CartRepositoryPort {
  constructor(
    @InjectRepository(CartOrmEntity)
    private readonly repository: Repository<CartOrmEntity>,
  ) {}

  async save(cart: Cart): Promise<Cart> {
    const saved = await this.repository.save(CartMapper.toOrm(cart));
    const reloaded = await this.repository.findOneOrFail({ where: { id: saved.id }, relations: { items: true } });

    return CartMapper.toDomain(reloaded);
  }

  async findById(id: string): Promise<Cart | null> {
    const orm = await this.repository.findOne({ where: { id }, relations: { items: true } });

    return orm ? CartMapper.toDomain(orm) : null;
  }
}
