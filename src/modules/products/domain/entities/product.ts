import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { OrderProducts } from '../../../../modules/orders/domain/entities/order-products.entity'

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ type: 'int' })
  quantity: string

  @OneToMany(() => OrderProducts, order_products => order_products.product, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  order_products: OrderProducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  update_at: Date
}
