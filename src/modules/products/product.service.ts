import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UpdateQuantityDTO } from './domain/dtos/update-quantity.dto'
import { Product } from './domain/entities/product'
import { ProductRepository } from './product.repository'

type updateQuantityRequest = UpdateQuantityDTO | UpdateQuantityDTO[]
type updateQuantityResponse = Product[] | Product

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async findAll(product_ids?: string[]): Promise<Product[]> {
    return product_ids
      ? await this.productRepository.findByIds(product_ids)
      : await this.productRepository.find()
  }

  async updateQuantity(
    products: updateQuantityRequest
  ): Promise<updateQuantityResponse> {
    if (!Array.isArray(products)) products = [products]

    const updatedProducts = []

    for (const product of products) {
      const findProduct = await this.productRepository.findOne(product.id)
      findProduct.quantity = product.quantity

      await this.productRepository.update(product.id, findProduct)
      updatedProducts.push(findProduct)
    }

    return updatedProducts.length === 1 ? updatedProducts[0] : updatedProducts
  }
}
