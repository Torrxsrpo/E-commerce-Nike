import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity.js';
import { CATEGORY_REPOSITORY, type CategoryRepositoryPort } from '../../domain/ports/category-repository.port.js';

@Injectable()
export class ListCategoriesUseCase {
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryPort) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
