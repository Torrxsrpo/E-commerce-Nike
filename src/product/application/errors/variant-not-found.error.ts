export class VariantNotFoundError extends Error {
  constructor(variantId: string) {
    super(`Variant with id "${variantId}" was not found`);
    this.name = 'VariantNotFoundError';
  }
}
