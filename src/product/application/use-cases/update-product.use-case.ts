import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity.js';
import { PRODUCT_REPOSITORY, type ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';
import { ProductNotFoundError } from '../errors/product-not-found.error.js';

export interface UpdateProductInput {
  productId: string;
  name?: string;
  description?: string;
  basePrice?: number;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: ProductRepositoryPort) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const product = await this.productRepository.findById(input.productId);

    if (!product) {
      throw new ProductNotFoundError(input.productId);
    }

    product.updateDetails({
      name: input.name,
      description: input.description,
      basePrice: input.basePrice,
    });

    return this.productRepository.save(product);
  }
}
