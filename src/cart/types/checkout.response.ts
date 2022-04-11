import { ApiProperty } from "@nestjs/swagger";
import { cartProductMock } from "src/promotion/services/strategies/promotion-strategies/__mocks/cart-product.mock";
import { CartProduct } from "../entities/cart-product.entity";

export class CheckoutResponse {
  @ApiProperty({
    isArray: true,
    example: [cartProductMock]
  })
  products: CartProduct[];
  
  @ApiProperty({
    example: 1000
  })
  totalAmount: number;
}