import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { OrderRepository } from './order.repository'
import { OrderProductsRepository } from './order_product.repository'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,

    @InjectRepository(OrderProductsRepository)
    private readonly orderProductsRepository: OrderProductsRepository
  ) {}
}
