import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import type { OrderStatus } from '../../domain/entities/order.entity.js';
import { OrderItemOrmEntity } from './order-item.orm-entity.js';

@Entity({ name: 'orders' })
export class OrderOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'contact_name' })
  contactName!: string;

  @Column({ name: 'contact_email' })
  contactEmail!: string;

  @Column({ type: 'varchar' })
  status!: OrderStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => OrderItemOrmEntity, (item) => item.order, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  items!: Relation<OrderItemOrmEntity>[];
}
