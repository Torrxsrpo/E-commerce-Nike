export class NegativeStockError extends Error {
  constructor(stock: number) {
    super(`Stock cannot be negative: ${stock}`);
    this.name = 'NegativeStockError';
  }
}