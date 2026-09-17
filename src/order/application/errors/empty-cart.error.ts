export class EmptyCartError extends Error {
  constructor(cartId: string) {
    super(`Cart with id "${cartId}" has no items to check out`);
    this.name = 'EmptyCartError';
  }
}
