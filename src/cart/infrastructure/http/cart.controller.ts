import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddItemToCartUseCase } from '../../application/use-cases/add-item-to-cart.use-case.js';
import { CreateCartUseCase } from '../../application/use-cases/create-cart.use-case.js';
import { GetCartUseCase } from '../../application/use-cases/get-cart.use-case.js';
import { RemoveItemFromCartUseCase } from '../../application/use-cases/remove-item-from-cart.use-case.js';
import { AddItemDto } from './dtos/add-item.dto.js';

@ApiTags('cart')
@Controller('carts')
export class CartController {
  constructor(
    private readonly createCart: CreateCartUseCase,
    private readonly getCart: GetCartUseCase,
    private readonly addItemToCart: AddItemToCartUseCase,
    private readonly removeItemFromCart: RemoveItemFromCartUseCase,
  ) {}

  @Post()
  create() {
    return this.createCart.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCart.execute(id);
  }

  @Post(':id/items')
  addItem(@Param('id') id: string, @Body() dto: AddItemDto) {
    return this.addItemToCart.execute({ cartId: id, ...dto });
  }

  @Delete(':id/items/:itemId')
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string) {
    return this.removeItemFromCart.execute({ cartId: id, cartItemId: itemId });
  }
}
