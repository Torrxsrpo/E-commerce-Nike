export class CartNotFoundError extends Error {
  constructor(cartId: string) {
    super(`Cart with id "${cartId}" was not found`);
    this.name = 'CartNotFoundError';
  }
}
