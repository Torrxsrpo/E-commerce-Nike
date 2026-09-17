import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import type { ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';
import { ProductNotFoundError } from '../errors/product-not-found.error.js';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    return product;
  }
}
