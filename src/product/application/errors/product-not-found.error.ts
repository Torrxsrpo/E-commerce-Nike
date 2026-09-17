export class ProductNotFoundError extends Error {
  constructor(productId: string) {
    super(`Product with id "${productId}" was not found`);
    this.name = 'ProductNotFoundError';
  }
}
