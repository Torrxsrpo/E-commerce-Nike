export class DuplicateVariantError extends Error {
  constructor(size: string, color: string) {
    super(`A variant with size "${size}" and color "${color}" already exists for this product`);
    this.name = 'DuplicateVariantError';
  }
}
