import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpdateQuantityDTO {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number
}
