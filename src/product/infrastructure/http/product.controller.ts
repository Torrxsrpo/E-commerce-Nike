import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddProductVariantUseCase } from '../../application/use-cases/add-product-variant.use-case.js';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case.js';
import { GetProductByIdUseCase } from '../../application/use-cases/get-product-by-id.use-case.js';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case.js';
import { UpdateProductUseCase } from '../../application/use-cases/update-product.use-case.js';
import { UpdateStockUseCase } from '../../application/use-cases/update-stock.use-case.js';
import { AddVariantDto } from './dtos/add-variant.dto.js';
import { CreateProductDto } from './dtos/create-product.dto.js';
import { UpdateProductDto } from './dtos/update-product.dto.js';
import { UpdateStockDto } from './dtos/update-stock.dto.js';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly listProducts: ListProductsUseCase,
    private readonly getProductById: GetProductByIdUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    private readonly addProductVariant: AddProductVariantUseCase,
    private readonly updateStock: UpdateStockUseCase,
  ) {}

  @Get()
  findAll(@Query('categoryId') categoryId?: string, @Query('search') search?: string) {
    return this.listProducts.execute({ categoryId, search });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getProductById.execute(id);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.createProduct.execute(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.updateProduct.execute({ productId: id, ...dto });
  }

  @Post(':id/variants')
  addVariant(@Param('id') id: string, @Body() dto: AddVariantDto) {
    return this.addProductVariant.execute({ productId: id, ...dto });
  }

  @Patch(':id/variants/:variantId/stock')
  changeStock(@Param('id') id: string, @Param('variantId') variantId: string, @Body() dto: UpdateStockDto) {
    return this.updateStock.execute({ productId: id, variantId, ...dto });
  }
}
