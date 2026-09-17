import { describe, expect, it } from 'vitest';
import { InMemoryCartRepository } from '../../infrastructure/persistence/in-memory-cart.repository.js';
import { AddItemToCartUseCase } from './add-item-to-cart.use-case.js';
import { CreateCartUseCase } from './create-cart.use-case.js';

describe('AddItemToCartUseCase', () => {
  it('merges quantity when the same variant is added twice', async () => {
    const repository = new InMemoryCartRepository();
    const createCart = new CreateCartUseCase(repository);
    const addItem = new AddItemToCartUseCase(repository);

    const cart = await createCart.execute();

    await addItem.execute({ cartId: cart.id, variantId: 'variant-1', quantity: 2 });
    const updatedCart = await addItem.execute({ cartId: cart.id, variantId: 'variant-1', quantity: 3 });

    expect(updatedCart.items).toHaveLength(1);
    expect(updatedCart.items[0]?.quantity).toBe(5);
  });
});
