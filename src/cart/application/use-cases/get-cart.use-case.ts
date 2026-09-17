import { Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import type { CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';
import { CartNotFoundError } from '../errors/cart-not-found.error.js';

@Injectable()
export class GetCartUseCase {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  async execute(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if (!cart) {
      throw new CartNotFoundError(cartId);
    }

    return cart;
  }
}
