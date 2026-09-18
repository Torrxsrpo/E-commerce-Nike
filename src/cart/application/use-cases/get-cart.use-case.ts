import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import { CART_REPOSITORY, type CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';
import { CartNotFoundError } from '../errors/cart-not-found.error.js';

@Injectable()
export class GetCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryPort) {}

  async execute(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if (!cart) {
      throw new CartNotFoundError(cartId);
    }

    return cart;
  }
}
