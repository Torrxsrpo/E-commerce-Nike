import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import type { ProductFilters, ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  async execute(filters: ProductFilters = {}): Promise<Product[]> {
    return this.productRepository.findAll(filters);
  }
}
