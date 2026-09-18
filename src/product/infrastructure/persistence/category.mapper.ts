import { Category } from '../../domain/entities/category.entity.js';
import { CategoryOrmEntity } from './category.orm-entity.js';

export class CategoryMapper {
  static toDomain(orm: CategoryOrmEntity): Category {
    return new Category({ id: orm.id, name: orm.name, slug: orm.slug });
  }

  static toOrm(domain: Category): CategoryOrmEntity {
    const orm = new CategoryOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.slug = domain.slug;

    return orm;
  }
}
