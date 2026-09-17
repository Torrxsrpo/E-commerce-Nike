import { describe, expect, it } from 'vitest';
import { AddItemToCartUseCase } from '../../../cart/application/use-cases/add-item-to-cart.use-case.js';
import { CreateCartUseCase } from '../../../cart/application/use-cases/create-cart.use-case.js';
import { InMemoryCartRepository } from '../../../cart/infrastructure/persistence/in-memory-cart.repository.js';
import { AddProductVariantUseCase } from '../../../product/application/use-cases/add-product-variant.use-case.js';
import { CreateProductUseCase } from '../../../product/application/use-cases/create-product.use-case.js';
import { InMemoryProductRepository } from '../../../product/infrastructure/persistence/in-memory-product.repository.js';
import { NegativeStockError } from '../../../product/domain/errors/negative-stock.error.js';
import { InMemoryOrderRepository } from '../../infrastructure/persistence/in-memory-order.repository.js';
import { CheckoutUseCase } from './checkout.use-case.js';
import { ConfirmOrderUseCase } from './confirm-order.use-case.js';

async function setupPendingOrder(stock: number, quantity: number) {
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
    stock,
  });

  const variantId = productWithVariant.variants[0]!.id;

  const cart = await new CreateCartUseCase(cartRepository).execute();
  await new AddItemToCartUseCase(cartRepository).execute({ cartId: cart.id, variantId, quantity });

  const order = await new CheckoutUseCase(cartRepository, productRepository, orderRepository).execute({
    cartId: cart.id,
    contactName: 'Jane Doe',
    contactEmail: 'jane@example.com',
  });

  return { productRepository, orderRepository, orderId: order.id, productId: product.id, variantId };
}

describe('ConfirmOrderUseCase', () => {
  it('confirms the order and decreases the variant stock', async () => {
    const { productRepository, orderRepository, orderId, productId, variantId } = await setupPendingOrder(10, 2);
    const confirmOrder = new ConfirmOrderUseCase(orderRepository, productRepository);

    const confirmedOrder = await confirmOrder.execute(orderId);

    expect(confirmedOrder.status).toBe('CONFIRMED');
    const product = await productRepository.findById(productId);
    expect(product?.getVariantById(variantId)?.stock).toBe(8);
  });

  it('keeps the order pending when there is not enough stock', async () => {
    const { productRepository, orderRepository, orderId } = await setupPendingOrder(1, 2);
    const confirmOrder = new ConfirmOrderUseCase(orderRepository, productRepository);

    await expect(confirmOrder.execute(orderId)).rejects.toThrow(NegativeStockError);

    const order = await orderRepository.findById(orderId);
    expect(order?.status).toBe('PENDING');
  });
});
