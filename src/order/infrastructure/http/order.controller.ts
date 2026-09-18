import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CheckoutUseCase } from '../../application/use-cases/checkout.use-case.js';
import { ConfirmOrderUseCase } from '../../application/use-cases/confirm-order.use-case.js';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id.use-case.js';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case.js';
import { UpdateOrderStatusUseCase } from '../../application/use-cases/update-order-status.use-case.js';
import { CheckoutDto } from './dtos/checkout.dto.js';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto.js';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly checkout: CheckoutUseCase,
    private readonly confirmOrder: ConfirmOrderUseCase,
    private readonly getOrderById: GetOrderByIdUseCase,
    private readonly listOrders: ListOrdersUseCase,
    private readonly updateOrderStatus: UpdateOrderStatusUseCase,
  ) {}

  @Post('checkout')
  createOrder(@Body() dto: CheckoutDto) {
    return this.checkout.execute(dto);
  }

  @Get()
  findAll() {
    return this.listOrders.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getOrderById.execute(id);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.confirmOrder.execute(id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.updateOrderStatus.execute({ orderId: id, status: dto.status });
  }
}
