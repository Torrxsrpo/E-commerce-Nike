export class OrderNotFoundError extends Error {
  constructor(orderId: string) {
    super(`Order with id "${orderId}" was not found`);
    this.name = 'OrderNotFoundError';
  }
}
