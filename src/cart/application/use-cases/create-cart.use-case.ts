import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import { CART_REPOSITORY, type CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';

@Injectable()
export class CreateCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryPort) {}

  async execute(): Promise<Cart> {
    const cart = new Cart({ id: randomUUID(), createdAt: new Date() });

    return this.cartRepository.save(cart);
  }
}
