export class CategoryNotFoundError extends Error {
  constructor(categoryId: string) {
    super(`Category with id "${categoryId}" was not found`);
    this.name = 'CategoryNotFoundError';
  }
}
