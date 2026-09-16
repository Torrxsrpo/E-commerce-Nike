import { describe, expect, it } from 'vitest';
import { NegativeStockError } from '../errors/negative-stock.error.js';
import { ProductVariant } from './product-variant.entity.js';

describe('ProductVariant', () => {
  it('creates a variant with the given stock', () => {
    const variant = new ProductVariant({
      id: 'variant-1',
      productId: 'product-1',
      size: 'M',
      color: 'black',
      sku: 'SKU-M-BLACK',
      stock: 10,
    });

    expect(variant.stock).toBe(10);
  });

  it('throws when created with negative stock', () => {
    expect(
      () =>
        new ProductVariant({
          id: 'variant-1',
          productId: 'product-1',
          size: 'M',
          color: 'black',
          sku: 'SKU-M-BLACK',
          stock: -5,
        }),
    ).toThrow(NegativeStockError);
  });

  it('decreases stock when there is enough available', () => {
    const variant = new ProductVariant({
      id: 'variant-1',
      productId: 'product-1',
      size: 'M',
      color: 'black',
      sku: 'SKU-M-BLACK',
      stock: 10,
    });

    variant.decreaseStock(4);

    expect(variant.stock).toBe(6);
  });

  it('throws when trying to decrease more stock than available', () => {
    const variant = new ProductVariant({
      id: 'variant-1',
      productId: 'product-1',
      size: 'M',
      color: 'black',
      sku: 'SKU-M-BLACK',
      stock: 10,
    });

    expect(() => variant.decreaseStock(11)).toThrow(NegativeStockError);
  });

  it('increases stock', () => {
    const variant = new ProductVariant({
      id: 'variant-1',
      productId: 'product-1',
      size: 'M',
      color: 'black',
      sku: 'SKU-M-BLACK',
      stock: 10,
    });

    variant.increaseStock(5);

    expect(variant.stock).toBe(15);
  });
});
