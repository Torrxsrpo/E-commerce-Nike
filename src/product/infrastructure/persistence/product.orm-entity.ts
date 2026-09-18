import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { CategoryOrmEntity } from './category.orm-entity.js';
import { ProductVariantOrmEntity } from './product-variant.orm-entity.js';

@Entity({ name: 'products' })
export class ProductOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'category_id' })
  categoryId!: string;

  @ManyToOne(() => CategoryOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category?: CategoryOrmEntity;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { name: 'base_price', precision: 10, scale: 2 })
  basePrice!: string;

  @OneToMany(() => ProductVariantOrmEntity, (variant) => variant.product, {
    cascade: true,
    eager: true,
    orphanedRowAction: 'delete',
  })
  variants!: Relation<ProductVariantOrmEntity>[];
}
