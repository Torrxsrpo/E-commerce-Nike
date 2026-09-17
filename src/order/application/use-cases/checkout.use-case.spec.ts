import { describe, expect, it } from 'vitest';
import { AddItemToCartUseCase } from '../../../cart/application/use-cases/add-item-to-cart.use-case.js';
import { CreateCartUseCase } from '../../../cart/application/use-cases/create-cart.use-case.js';
import { InMemoryCartRepository } from '../../../cart/infrastructure/persistence/in-memory-cart.repository.js';
import { AddProductVariantUseCase } from '../../../product/application/use-cases/add-product-variant.use-case.js';
import { CreateProductUseCase } from '../../../product/application/use-cases/create-product.use-case.js';
import { InMemoryProductRepository } from '../../../product/infrastructure/persistence/in-memory-product.repository.js';
import { InMemoryOrderRepository } from '../../infrastructure/persistence/in-memory-order.repository.js';
import { EmptyCartError } from '../errors/empty-cart.error.js';
import { CheckoutUseCase } from './checkout.use-case.js';

async function setupCartWithOneItem() {
  const cartRepository = new InMemoryCartRepository();
  const productRepository = new InMemoryProductRepository();
  const orderRepository = new InMemoryOrderRepository();

  const product = await new CreateProductUseCase(productRepository).execute({
    categoryId: 'cat-1',
    name: 'Air Max',
    description: 'Classic sneaker',
    basePrice: 100,
  });

  const productWithVariant = await new AddProductVariantUseCase(productRepository).execute({
    productId: product.id,
    size: 'M',
    color: 'black',
    sku: 'SKU-M-BLACK',
    stock: 10,
  });

  const variantId = productWithVariant.variants[0]!.id;

  const cart = await new CreateCartUseCase(cartRepository).execute();
  await new AddItemToCartUseCase(cartRepository).execute({ cartId: cart.id, variantId, quantity: 2 });

  return { cartRepository, productRepository, orderRepository, cartId: cart.id };
}

describe('CheckoutUseCase', () => {
  it('creates a pending order with a price snapshot from the cart items', async () => {
    const { cartRepository, productRepository, orderRepository, cartId } = await setupCartWithOneItem();
    const checkout = new CheckoutUseCase(cartRepository, productRepository, orderRepository);

    const order = await checkout.execute({
      cartId,
      contactName: 'Jane Doe',
      contactEmail: 'jane@example.com',
    });

    expect(order.status).toBe('PENDING');
    expect(order.items).toHaveLength(1);
    expect(order.items[0]?.unitPrice).toBe(100);
    expect(order.items[0]?.productNameSnapshot).toBe('Air Max');
    expect(order.total).toBe(200);
  });

  it('throws when the cart has no items', async () => {
    const cartRepository = new InMemoryCartRepository();
    const productRepository = new InMemoryProductRepository();
    const orderRepository = new InMemoryOrderRepository();
    const cart = await new CreateCartUseCase(cartRepository).execute();

    const checkout = new CheckoutUseCase(cartRepository, productRepository, orderRepository);

    await expect(
      checkout.execute({ cartId: cart.id, contactName: 'Jane Doe', contactEmail: 'jane@example.com' }),
    ).rejects.toThrow(EmptyCartError);
  });
});
