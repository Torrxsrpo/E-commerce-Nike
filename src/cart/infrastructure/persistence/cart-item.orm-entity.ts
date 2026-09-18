import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { CartOrmEntity } from './cart.orm-entity.js';

@Entity({ name: 'cart_items' })
export class CartItemOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'cart_id' })
  cartId!: string;

  @ManyToOne(() => CartOrmEntity, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart?: Relation<CartOrmEntity>;

  @Column({ name: 'variant_id' })
  variantId!: string;

  @Column('int')
  quantity!: number;
}
