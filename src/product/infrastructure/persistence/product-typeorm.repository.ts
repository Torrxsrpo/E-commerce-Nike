import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from '../../domain/entities/product.entity.js';
import { ProductFilters, ProductRepositoryPort } from '../../domain/ports/product-repository.port.js';
import { ProductMapper } from './product.mapper.js';
import { ProductOrmEntity } from './product.orm-entity.js';

@Injectable()
export class ProductTypeOrmRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly repository: Repository<ProductOrmEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const orm = ProductMapper.toOrm(product);
    const saved = await this.repository.save(orm);
    const reloaded = await this.repository.findOneOrFail({ where: { id: saved.id }, relations: { variants: true } });

    return ProductMapper.toDomain(reloaded);
  }

  async findById(id: string): Promise<Product | null> {
    const orm = await this.repository.findOne({ where: { id }, relations: { variants: true } });

    return orm ? ProductMapper.toDomain(orm) : null;
  }

  async findByVariantId(variantId: string): Promise<Product | null> {
    const orm = await this.repository.findOne({
      where: { variants: { id: variantId } },
      relations: { variants: true },
    });

    return orm ? ProductMapper.toDomain(orm) : null;
  }

  async findAll(filters: ProductFilters = {}): Promise<Product[]> {
    const orms = await this.repository.find({
      where: {
        ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
        ...(filters.search ? { name: ILike(`%${filters.search}%`) } : {}),
      },
      relations: { variants: true },
    });

    return orms.map((orm) => ProductMapper.toDomain(orm));
  }
}
