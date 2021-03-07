import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderController } from './order.controller'
import { OrderRepository } from './order.repository'
import { OrderService } from './order.service'
import { OrderProductsRepository } from './order_product.repository'

import { UsersModule } from 'modules/customers/users.module'
import { ProductModule } from 'modules/products/product.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderProductsRepository]),
    UsersModule,
    ProductModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
