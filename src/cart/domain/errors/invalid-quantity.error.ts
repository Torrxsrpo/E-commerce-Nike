export class InvalidQuantityError extends Error {
  constructor(attemptedQuantity: number) {
    super(`Quantity must be greater than zero (attempted: ${attemptedQuantity})`);
    this.name = 'InvalidQuantityError';
  }
}
