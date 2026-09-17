import { describe, expect, it } from 'vitest';
import { InMemoryProductRepository } from '../../infrastructure/persistence/in-memory-product.repository.js';
import { CreateProductUseCase } from './create-product.use-case.js';
import { ListProductsUseCase } from './list-products.use-case.js';

describe('ListProductsUseCase', () => {
  it('lists all products when no filter is given', async () => {
    const repository = new InMemoryProductRepository();
    const createProduct = new CreateProductUseCase(repository);
    const listProducts = new ListProductsUseCase(repository);

    await createProduct.execute({ categoryId: 'cat-1', name: 'Air Max', description: 'd', basePrice: 100 });
    await createProduct.execute({ categoryId: 'cat-2', name: 'Air Force', description: 'd', basePrice: 90 });

    const products = await listProducts.execute();

    expect(products).toHaveLength(2);
  });

  it('filters products by categoryId', async () => {
    const repository = new InMemoryProductRepository();
    const createProduct = new CreateProductUseCase(repository);
    const listProducts = new ListProductsUseCase(repository);

    await createProduct.execute({ categoryId: 'cat-1', name: 'Air Max', description: 'd', basePrice: 100 });
    await createProduct.execute({ categoryId: 'cat-2', name: 'Air Force', description: 'd', basePrice: 90 });

    const products = await listProducts.execute({ categoryId: 'cat-1' });

    expect(products).toHaveLength(1);
    expect(products[0]?.name).toBe('Air Max');
  });

  it('filters products by search text in the name', async () => {
    const repository = new InMemoryProductRepository();
    const createProduct = new CreateProductUseCase(repository);
    const listProducts = new ListProductsUseCase(repository);

    await createProduct.execute({ categoryId: 'cat-1', name: 'Air Max', description: 'd', basePrice: 100 });
    await createProduct.execute({ categoryId: 'cat-1', name: 'Air Force', description: 'd', basePrice: 90 });

    const products = await listProducts.execute({ search: 'max' });

    expect(products).toHaveLength(1);
    expect(products[0]?.name).toBe('Air Max');
  });
});
