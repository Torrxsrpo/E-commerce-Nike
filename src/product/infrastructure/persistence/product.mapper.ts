import { Product } from '../../domain/entities/product.entity.js';
import { ProductVariant } from '../../domain/entities/product-variant.entity.js';
import { ProductOrmEntity } from './product.orm-entity.js';
import { ProductVariantOrmEntity } from './product-variant.orm-entity.js';

export class ProductMapper {
  static toDomain(orm: ProductOrmEntity): Product {
    return new Product({
      id: orm.id,
      categoryId: orm.categoryId,
      name: orm.name,
      description: orm.description,
      basePrice: Number(orm.basePrice),
      variants: (orm.variants ?? []).map((variant) => this.variantToDomain(variant)),
    });
  }

  static variantToDomain(orm: ProductVariantOrmEntity): ProductVariant {
    return new ProductVariant({
      id: orm.id,
      productId: orm.productId,
      size: orm.size,
      color: orm.color,
      sku: orm.sku,
      stock: orm.stock,
    });
  }

  static toOrm(domain: Product): ProductOrmEntity {
    const orm = new ProductOrmEntity();
    orm.id = domain.id;
    orm.categoryId = domain.categoryId;
    orm.name = domain.name;
    orm.description = domain.description;
    orm.basePrice = domain.basePrice.toString();
    orm.variants = domain.variants.map((variant) => this.variantToOrm(variant, domain.id));

    return orm;
  }

  static variantToOrm(domain: ProductVariant, productId: string): ProductVariantOrmEntity {
    const orm = new ProductVariantOrmEntity();
    orm.id = domain.id;
    orm.productId = productId;
    orm.size = domain.size;
    orm.color = domain.color;
    orm.sku = domain.sku;
    orm.stock = domain.stock;

    return orm;
  }
}
