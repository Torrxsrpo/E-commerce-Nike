import { describe, expect, it } from 'vitest';
import { NegativeStockError } from '../../domain/errors/negative-stock.error.js';
import { InMemoryProductRepository } from '../../infrastructure/persistence/in-memory-product.repository.js';
import { AddProductVariantUseCase } from './add-product-variant.use-case.js';
import { CreateProductUseCase } from './create-product.use-case.js';
import { UpdateStockUseCase } from './update-stock.use-case.js';

async function setupProductWithVariant(repository: InMemoryProductRepository) {
  const createProduct = new CreateProductUseCase(repository);
  const addVariant = new AddProductVariantUseCase(repository);

  const product = await createProduct.execute({
    categoryId: 'category-1',
    name: 'Air Max',
    description: 'Classic sneaker',
    basePrice: 100,
  });

  const updatedProduct = await addVariant.execute({
    productId: product.id,
    size: 'M',
    color: 'black',
    sku: 'SKU-M-BLACK',
    stock: 10,
  });

  return { productId: updatedProduct.id, variantId: updatedProduct.variants[0]!.id };
}

describe('UpdateStockUseCase', () => {
  it('decreases the stock of a variant', async () => {
    const repository = new InMemoryProductRepository();
    const { productId, variantId } = await setupProductWithVariant(repository);
    const updateStock = new UpdateStockUseCase(repository);

    const product = await updateStock.execute({ productId, variantId, quantity: 3, operation: 'decrease' });

    expect(product.getVariantById(variantId)?.stock).toBe(7);
  });

  it('increases the stock of a variant', async () => {
    const repository = new InMemoryProductRepository();
    const { productId, variantId } = await setupProductWithVariant(repository);
    const updateStock = new UpdateStockUseCase(repository);

    const product = await updateStock.execute({ productId, variantId, quantity: 5, operation: 'increase' });

    expect(product.getVariantById(variantId)?.stock).toBe(15);
  });

  it('throws when decreasing more stock than available', async () => {
    const repository = new InMemoryProductRepository();
    const { productId, variantId } = await setupProductWithVariant(repository);
    const updateStock = new UpdateStockUseCase(repository);

    await expect(
      updateStock.execute({ productId, variantId, quantity: 100, operation: 'decrease' }),
    ).rejects.toThrow(NegativeStockError);
  });
});
