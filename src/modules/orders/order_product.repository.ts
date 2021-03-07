import { EntityRepository, Repository } from 'typeorm'

import { OrderProducts } from './domain/entities/order-products.entity'

@EntityRepository(OrderProducts)
export class OrderProductsRepository extends Repository<OrderProducts> {}
