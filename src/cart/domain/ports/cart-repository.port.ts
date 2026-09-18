import { Cart } from '../entities/cart.entity.js';

export const CART_REPOSITORY = Symbol('CART_REPOSITORY');

export interface CartRepositoryPort {
  save(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
}
