import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from '../cart/cart.module.js';
import { ProductModule } from '../product/product.module.js';
import { CheckoutUseCase } from './application/use-cases/checkout.use-case.js';
import { ConfirmOrderUseCase } from './application/use-cases/confirm-order.use-case.js';
import { GetOrderByIdUseCase } from './application/use-cases/get-order-by-id.use-case.js';
import { ListOrdersUseCase } from './application/use-cases/list-orders.use-case.js';
import { UpdateOrderStatusUseCase } from './application/use-cases/update-order-status.use-case.js';
import { ORDER_REPOSITORY } from './domain/ports/order-repository.port.js';
import { OrderController } from './infrastructure/http/order.controller.js';
import { OrderItemOrmEntity } from './infrastructure/persistence/order-item.orm-entity.js';
import { OrderTypeOrmRepository } from './infrastructure/persistence/order-typeorm.repository.js';
import { OrderOrmEntity } from './infrastructure/persistence/order.orm-entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity, OrderItemOrmEntity]), CartModule, ProductModule],
  controllers: [OrderController],
  providers: [
    CheckoutUseCase,
    ConfirmOrderUseCase,
    GetOrderByIdUseCase,
    ListOrdersUseCase,
    UpdateOrderStatusUseCase,
    { provide: ORDER_REPOSITORY, useClass: OrderTypeOrmRepository },
  ],
})
export class OrderModule {}
