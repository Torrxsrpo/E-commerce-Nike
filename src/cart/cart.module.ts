import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddItemToCartUseCase } from './application/use-cases/add-item-to-cart.use-case.js';
import { CreateCartUseCase } from './application/use-cases/create-cart.use-case.js';
import { GetCartUseCase } from './application/use-cases/get-cart.use-case.js';
import { RemoveItemFromCartUseCase } from './application/use-cases/remove-item-from-cart.use-case.js';
import { CART_REPOSITORY } from './domain/ports/cart-repository.port.js';
import { CartController } from './infrastructure/http/cart.controller.js';
import { CartItemOrmEntity } from './infrastructure/persistence/cart-item.orm-entity.js';
import { CartTypeOrmRepository } from './infrastructure/persistence/cart-typeorm.repository.js';
import { CartOrmEntity } from './infrastructure/persistence/cart.orm-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CartOrmEntity, CartItemOrmEntity])],
  controllers: [CartController],
  providers: [
    CreateCartUseCase,
    GetCartUseCase,
    AddItemToCartUseCase,
    RemoveItemFromCartUseCase,
    { provide: CART_REPOSITORY, useClass: CartTypeOrmRepository },
  ],
  exports: [CART_REPOSITORY],
})
export class CartModule {}
