import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Product } from '../../../../modules/products/domain/entities/product'

import { Order } from './order.entity'

@Entity('order_products')
export class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ type: 'int' })
  quantity: number

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  order_id: string

  @Column()
  product_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
