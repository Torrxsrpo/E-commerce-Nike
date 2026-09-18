import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../domain/entities/category.entity.js';
import { CategoryRepositoryPort } from '../../domain/ports/category-repository.port.js';
import { CategoryMapper } from './category.mapper.js';
import { CategoryOrmEntity } from './category.orm-entity.js';

@Injectable()
export class CategoryTypeOrmRepository implements CategoryRepositoryPort {
  constructor(
    @InjectRepository(CategoryOrmEntity)
    private readonly repository: Repository<CategoryOrmEntity>,
  ) {}

  async save(category: Category): Promise<Category> {
    const saved = await this.repository.save(CategoryMapper.toOrm(category));

    return CategoryMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Category | null> {
    const orm = await this.repository.findOne({ where: { id } });

    return orm ? CategoryMapper.toDomain(orm) : null;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const orm = await this.repository.findOne({ where: { slug } });

    return orm ? CategoryMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<Category[]> {
    const orms = await this.repository.find();

    return orms.map((orm) => CategoryMapper.toDomain(orm));
  }
}
