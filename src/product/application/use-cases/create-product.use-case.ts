import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import { PRODUCT_REPOSITORY, type ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';

export interface CreateProductInput {
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
}

@Injectable()
export class CreateProductUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryPort) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const product = new Product({
      id: randomUUID(),
      categoryId: input.categoryId,
      name: input.name,
      description: input.description,
      basePrice: input.basePrice,
    });

    return this.productRepository.save(product);
  }
}
