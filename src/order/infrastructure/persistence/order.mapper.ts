import { Order } from '../../domain/entities/order.entity.js';
import { OrderItem } from '../../domain/entities/order-item.entity.js';
import { OrderItemOrmEntity } from './order-item.orm-entity.js';
import { OrderOrmEntity } from './order.orm-entity.js';

export class OrderMapper {
  static toDomain(orm: OrderOrmEntity): Order {
    return new Order({
      id: orm.id,
      contactName: orm.contactName,
      contactEmail: orm.contactEmail,
      status: orm.status,
      createdAt: orm.createdAt,
      items: (orm.items ?? []).map(
        (item) =>
          new OrderItem({
            id: item.id,
            orderId: item.orderId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            productNameSnapshot: item.productNameSnapshot,
          }),
      ),
    });
  }

  static toOrm(domain: Order): OrderOrmEntity {
    const orm = new OrderOrmEntity();
    orm.id = domain.id;
    orm.contactName = domain.contactName;
    orm.contactEmail = domain.contactEmail;
    orm.status = domain.status;
    orm.createdAt = domain.createdAt;
    orm.items = domain.items.map((item) => {
      const itemOrm = new OrderItemOrmEntity();
      itemOrm.id = item.id;
      itemOrm.orderId = domain.id;
      itemOrm.variantId = item.variantId;
      itemOrm.quantity = item.quantity;
      itemOrm.unitPrice = item.unitPrice.toString();
      itemOrm.productNameSnapshot = item.productNameSnapshot;

      return itemOrm;
    });

    return orm;
  }
}
