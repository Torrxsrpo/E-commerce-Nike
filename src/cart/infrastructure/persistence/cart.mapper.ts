import { Cart } from '../../domain/entities/cart.entity.js';
import { CartItem } from '../../domain/entities/cart-item.entity.js';
import { CartItemOrmEntity } from './cart-item.orm-entity.js';
import { CartOrmEntity } from './cart.orm-entity.js';

export class CartMapper {
  static toDomain(orm: CartOrmEntity): Cart {
    return new Cart({
      id: orm.id,
      createdAt: orm.createdAt,
      items: (orm.items ?? []).map(
        (item) =>
          new CartItem({
            id: item.id,
            cartId: item.cartId,
            variantId: item.variantId,
            quantity: item.quantity,
          }),
      ),
    });
  }

  static toOrm(domain: Cart): CartOrmEntity {
    const orm = new CartOrmEntity();
    orm.id = domain.id;
    orm.createdAt = domain.createdAt;
    orm.items = domain.items.map((item) => {
      const itemOrm = new CartItemOrmEntity();
      itemOrm.id = item.id;
      itemOrm.cartId = domain.id;
      itemOrm.variantId = item.variantId;
      itemOrm.quantity = item.quantity;

      return itemOrm;
    });

    return orm;
  }
}
