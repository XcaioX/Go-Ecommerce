import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OrderController } from './order.controller'
import { OrderRepository } from './order.repository'
import { OrderService } from './order.service'
import { OrderProductsRepository } from './order_product.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderProductsRepository])
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
