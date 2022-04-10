import { Cart } from "src/cart/entities/cart.entity";
import { cartProductMock } from "./cart-product.mock";

export const cartMock: Cart = {
  id: 1,
  products: [ { ...cartProductMock }, ]
}