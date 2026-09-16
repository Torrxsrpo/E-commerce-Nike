export class InvalidOrderStatusTransitionError extends Error {
  constructor(from: string, to: string) {
    super(`Cannot change order status from "${from}" to "${to}"`);
    this.name = 'InvalidOrderStatusTransitionError';
  }
}
