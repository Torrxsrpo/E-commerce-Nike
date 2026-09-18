import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity.js';
import { CATEGORY_REPOSITORY, type CategoryRepositoryPort } from '../../domain/ports/category-repository.port.js';
import { CategoryNotFoundError } from '../errors/category-not-found.error.js';

@Injectable()
export class GetCategoryByIdUseCase {
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryPort) {}

  async execute(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new CategoryNotFoundError(categoryId);
    }

    return category;
  }
}
