import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import type { ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';
import { ProductNotFoundError } from '../errors/product-not-found.error.js';
import { VariantNotFoundError } from '../errors/variant-not-found.error.js';

export interface UpdateStockInput {
  productId: string;
  variantId: string;
  quantity: number;
  operation: 'increase' | 'decrease';
}

@Injectable()
export class UpdateStockUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(input: UpdateStockInput): Promise<Product> {
    const product = await this.productRepository.findById(input.productId);

    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    const variant = product.getVariantById(input.variantId);

    if (!variant) {
      throw new VariantNotFoundError(input.variantId);
    }

    if (input.operation === 'increase') {
      variant.increaseStock(input.quantity);
    } else {
      variant.decreaseStock(input.quantity);
    }

    return this.productRepository.save(product);
  }
}
