import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { OrderOrmEntity } from './order.orm-entity.js';

@Entity({ name: 'order_items' })
export class OrderItemOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'order_id' })
  orderId!: string;

  @ManyToOne(() => OrderOrmEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order?: Relation<OrderOrmEntity>;

  @Column({ name: 'variant_id' })
  variantId!: string;

  @Column('int')
  quantity!: number;

  @Column('decimal', { name: 'unit_price', precision: 10, scale: 2 })
  unitPrice!: string;

  @Column({ name: 'product_name_snapshot' })
  productNameSnapshot!: string;
}
