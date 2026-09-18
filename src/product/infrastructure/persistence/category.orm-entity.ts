import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;
}
