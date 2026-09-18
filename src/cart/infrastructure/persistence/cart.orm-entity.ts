import { CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { CartItemOrmEntity } from './cart-item.orm-entity.js';

@Entity({ name: 'carts' })
export class CartOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => CartItemOrmEntity, (item) => item.cart, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  items!: Relation<CartItemOrmEntity>[];
}
