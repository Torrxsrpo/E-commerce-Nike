import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import type { CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';

@Injectable()
export class CreateCartUseCase {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  async execute(): Promise<Cart> {
    const cart = new Cart({ id: randomUUID(), createdAt: new Date() });

    return this.cartRepository.save(cart);
  }
}
