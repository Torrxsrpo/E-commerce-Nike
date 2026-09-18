import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { ProductOrmEntity } from './product.orm-entity.js';

@Entity({ name: 'product_variants' })
export class ProductVariantOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ name: 'product_id' })
  productId!: string;

  @ManyToOne(() => ProductOrmEntity, (product) => product.variants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product?: Relation<ProductOrmEntity>;

  @Column()
  size!: string;

  @Column()
  color!: string;

  @Column({ unique: true })
  sku!: string;

  @Column('int')
  stock!: number;
}
