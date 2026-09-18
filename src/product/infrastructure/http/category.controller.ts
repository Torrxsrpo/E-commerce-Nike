import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case.js';
import { GetCategoryByIdUseCase } from '../../application/use-cases/get-category-by-id.use-case.js';
import { ListCategoriesUseCase } from '../../application/use-cases/list-categories.use-case.js';
import { CreateCategoryDto } from './dtos/create-category.dto.js';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategory: CreateCategoryUseCase,
    private readonly listCategories: ListCategoriesUseCase,
    private readonly getCategoryById: GetCategoryByIdUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listCategories.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCategoryById.execute(id);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.createCategory.execute(dto);
  }
}
