import { Product } from '../../domain/entities/product.entity.js';
import { ProductFilters, ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';

export class InMemoryProductRepository implements ProductRepositoryPort {
  private readonly products: Product[] = [];

  async save(product: Product): Promise<Product> {
    const existingIndex = this.products.findIndex((existing) => existing.id === product.id);

    if (existingIndex === -1) {
      this.products.push(product);
    } else {
      this.products[existingIndex] = product;
    }

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) ?? null;
  }

  async findAll(filters: ProductFilters = {}): Promise<Product[]> {
    return this.products.filter((product) => {
      const matchesCategory = !filters.categoryId || product.categoryId === filters.categoryId;
      const matchesSearch =
        !filters.search || product.name.toLowerCase().includes(filters.search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }
}
