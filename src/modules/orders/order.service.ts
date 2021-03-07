import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ICreateOrderDTO } from './domain/dtos/create-order.dto'
import { Order } from './domain/entities/order.entity'
import { OrderRepository } from './order.repository'
import { OrderProductsRepository } from './order_product.repository'

import { UsersService } from 'modules/customers/users.service'
import { ProductService } from 'modules/products/product.service'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,

    @InjectRepository(OrderProductsRepository)
    private readonly orderProductsRepository: OrderProductsRepository,

    @Inject(() => UsersService)
    private readonly customerService: UsersService,

    @Inject(() => ProductService)
    private readonly productService: ProductService
  ) {}

  async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const customerExists = await this.customerService.findOne(customer)

    if (!customerExists) {
      throw new NotFoundException(
        'Could not find any customer with the given ids'
      )
    }

    const existentProducts = await this.productService.findAll(
      products.map(product => product.id)
    )

    if (!existentProducts) {
      throw new NotFoundException(
        'Could not find any product with the given ids'
      )
    }

    const existentProductsIds = existentProducts.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id)
    )

    if (checkInexistentProducts.length) {
      throw new NotFoundException(
        `Could not find products ${JSON.stringify(checkInexistentProducts)}`
      )
    }

    const findProductsWithNoQuantity = products.filter(
      product =>
        existentProducts.find(p => p.id === product.id).quantity <
        product.quantity
    )

    if (!findProductsWithNoQuantity) {
      throw new PreconditionFailedException('Product without enough quantity')
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.find(p => p.id === product.id).price
    }))

    const order = this.orderRepository.create({
      customer: customerExists,
      order_products: serializedProducts
    })

    const { order_products } = order

    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existentProducts.find(p => p.id === product.id).quantity -
        product.quantity
    }))

    await this.productService.updateQuantity(orderedProductsQuantity)

    return order
  }
}
