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

  getVariantById(variantId: string): ProductVariant | undefined {
    return this._variants.find((variant) => variant.id === variantId);
  }

  updateDetails(changes: { name?: string; description?: string; basePrice?: number }): void {
    if (changes.name !== undefined) {
      this.props.name = changes.name;
    }

    if (changes.description !== undefined) {
      this.props.description = changes.description;
    }

    if (changes.basePrice !== undefined) {
      this.props.basePrice = changes.basePrice;
    }
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
