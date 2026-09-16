export class EmptyOrderError extends Error {
  constructor() {
    super('An order cannot be confirmed without items');
    this.name = 'EmptyOrderError';
  }
}
