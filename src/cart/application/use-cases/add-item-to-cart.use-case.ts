import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity.js';
import { CartItem } from '../../domain/entities/cart-item.entity.js';
import { CART_REPOSITORY, type CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';
import { CartNotFoundError } from '../errors/cart-not-found.error.js';

export interface AddItemToCartInput {
  cartId: string;
  variantId: string;
  quantity: number;
}

@Injectable()
export class AddItemToCartUseCase {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: CartRepositoryPort) {}

  async execute(input: AddItemToCartInput): Promise<Cart> {
    const cart = await this.cartRepository.findById(input.cartId);

    if (!cart) {
      throw new CartNotFoundError(input.cartId);
    }

    const item = new CartItem({
      id: randomUUID(),
      cartId: cart.id,
      variantId: input.variantId,
      quantity: input.quantity,
    });

    cart.addItem(item);

    return this.cartRepository.save(cart);
  }
}
