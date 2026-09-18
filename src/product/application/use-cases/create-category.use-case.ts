import { randomUUID } from 'node:crypto';
import { Inject, Injectable } from '@nestjs/common';
import { Category } from '../../domain/entities/category.entity.js';
import { CATEGORY_REPOSITORY, type CategoryRepositoryPort } from '../../domain/ports/category-repository.port.js';

export interface CreateCategoryInput {
  name: string;
  slug: string;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepository: CategoryRepositoryPort) {}

  async execute(input: CreateCategoryInput): Promise<Category> {
    const category = new Category({
      id: randomUUID(),
      name: input.name,
      slug: input.slug,
    });

    return this.categoryRepository.save(category);
  }
}
