import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import { PRODUCT_REPOSITORY, type ProductFilters, type ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';

@Injectable()
export class ListProductsUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryPort) {}

  async execute(filters: ProductFilters = {}): Promise<Product[]> {
    return this.productRepository.findAll(filters);
  }
}
