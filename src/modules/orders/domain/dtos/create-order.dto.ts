import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export type IProducts = {
  id: string
  quantity: number
}

export class ICreateOrderDTO {
  @IsNotEmpty()
  @IsString({ each: true })
  customer: string

  @IsNotEmpty({ each: true })
  @IsArray()
  products: IProducts[]
}
