import { ApiProperty } from "@nestjs/swagger";

export class CheckoutRequest {
  @ApiProperty({ example: 1 })
  cartId: number;
}