import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { User } from '../../../../modules/customers/domain'

import { OrderProducts } from './order-products.entity'

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  customer_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User

  @OneToMany(() => OrderProducts, order_products => order_products.order, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  })
  order_products: OrderProducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
