import { Cart } from '../../domain/entities/cart.entity.js';
import { CartRepositoryPort } from '../../domain/ports/cart-repository.port.js';

export class InMemoryCartRepository implements CartRepositoryPort {
  private readonly carts: Cart[] = [];

  async save(cart: Cart): Promise<Cart> {
    const existingIndex = this.carts.findIndex((existing) => existing.id === cart.id);

    if (existingIndex === -1) {
      this.carts.push(cart);
    } else {
      this.carts[existingIndex] = cart;
    }

    return cart;
  }

  async findById(id: string): Promise<Cart | null> {
    return this.carts.find((cart) => cart.id === id) ?? null;
  }
}
