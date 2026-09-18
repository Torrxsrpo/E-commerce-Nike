import { Product } from '../entities/product.entity.js';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductFilters {
  categoryId?: string;
  search?: string;
}

export interface ProductRepositoryPort {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByVariantId(variantId: string): Promise<Product | null>;
  findAll(filters?: ProductFilters): Promise<Product[]>;
}
