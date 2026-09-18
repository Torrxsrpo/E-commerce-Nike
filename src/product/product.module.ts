import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddProductVariantUseCase } from './application/use-cases/add-product-variant.use-case.js';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case.js';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case.js';
import { GetCategoryByIdUseCase } from './application/use-cases/get-category-by-id.use-case.js';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.use-case.js';
import { ListCategoriesUseCase } from './application/use-cases/list-categories.use-case.js';
import { ListProductsUseCase } from './application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case.js';
import { UpdateStockUseCase } from './application/use-cases/update-stock.use-case.js';
import { CATEGORY_REPOSITORY } from './domain/ports/category-repository.port.js';
import { PRODUCT_REPOSITORY } from './domain/ports/product-repository.port.js';
import { CategoryController } from './infrastructure/http/category.controller.js';
import { ProductController } from './infrastructure/http/product.controller.js';
import { CategoryTypeOrmRepository } from './infrastructure/persistence/category-typeorm.repository.js';
import { CategoryOrmEntity } from './infrastructure/persistence/category.orm-entity.js';
import { ProductTypeOrmRepository } from './infrastructure/persistence/product-typeorm.repository.js';
import { ProductVariantOrmEntity } from './infrastructure/persistence/product-variant.orm-entity.js';
import { ProductOrmEntity } from './infrastructure/persistence/product.orm-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity, ProductVariantOrmEntity, CategoryOrmEntity])],
  controllers: [ProductController, CategoryController],
  providers: [
    CreateProductUseCase,
    ListProductsUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    AddProductVariantUseCase,
    UpdateStockUseCase,
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    GetCategoryByIdUseCase,
    { provide: PRODUCT_REPOSITORY, useClass: ProductTypeOrmRepository },
    { provide: CATEGORY_REPOSITORY, useClass: CategoryTypeOrmRepository },
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}
