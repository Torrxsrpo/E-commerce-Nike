import { DuplicateVariantError } from '../errors/duplicate-variant.error.js';
import { ProductVariant } from './product-variant.entity.js';

export interface ProductProps {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  basePrice: number;
  variants?: ProductVariant[];
}

export class Product {
  private readonly _variants: ProductVariant[] = [];

  constructor(private props: ProductProps) {
    for (const variant of props.variants ?? []) {
      this.addVariant(variant);
    }
  }

  get id(): string {
    return this.props.id;
  }

  get categoryId(): string {
    return this.props.categoryId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get basePrice(): number {
    return this.props.basePrice;
  }

  get variants(): readonly ProductVariant[] {
    return this._variants;
  }

  addVariant(variant: ProductVariant): void {
    const alreadyExists = this._variants.some(
      (existing) => existing.size === variant.size && existing.color === variant.color,
    );

    if (alreadyExists) {
      throw new DuplicateVariantError(variant.size, variant.color);
    }

    this._variants.push(variant);
  }
}
