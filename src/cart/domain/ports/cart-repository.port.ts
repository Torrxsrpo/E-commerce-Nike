import { Cart } from '../entities/cart.entity.js';

export interface CartRepositoryPort {
  save(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
}
