import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import { CART_REPOSITORY, type CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';
import { CartNotFoundError } from '../errors/cart-not-found.error.js';

export interface RemoveItemFromCartInput {
  cartId: string;
  cartItemId: string;
}

@Injectable()
export class RemoveItemFromCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryPort) {}

  async execute(input: RemoveItemFromCartInput): Promise<Cart> {
    const cart = await this.cartRepository.findById(input.cartId);

    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }

    cart.removeItem(input.cartItemId);

    return this.cartRepository.save(cart);
  }
}
