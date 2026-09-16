export class NegativeUnitPriceError extends Error {
  constructor(attemptedPrice: number) {
    super(`Unit price cannot be negative (attempted: ${attemptedPrice})`);
    this.name = 'NegativeUnitPriceError';
  }
}
