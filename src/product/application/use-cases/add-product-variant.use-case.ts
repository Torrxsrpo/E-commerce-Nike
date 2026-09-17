import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import { ProductVariant } from '../../domain/entities/product-variant.entity.js';
import type { ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';
import { ProductNotFoundError } from '../errors/product-not-found.error.js';

export interface AddProductVariantInput {
  productId: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
}

@Injectable()
export class AddProductVariantUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(input: AddProductVariantInput): Promise<Product> {
    const product = await this.productRepository.findById(input.productId);

    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    const variant = new ProductVariant({
      id: randomUUID(),
      productId: product.id,
      size: input.size,
      color: input.color,
      sku: input.sku,
      stock: input.stock,
    });

    product.addVariant(variant);

    return this.productRepository.save(product);
  }
}
