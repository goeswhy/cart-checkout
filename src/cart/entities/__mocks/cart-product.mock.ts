import { productMock } from "src/promotion/services/strategies/promotion-strategies/__mocks/cart-product.mock";
import { promotionMock } from "src/promotion/services/strategies/promotion-strategies/__mocks/promotion.mock";
import { CartProduct } from "../cart-product.entity";

export const cartProductMock: CartProduct = {
  id: 1,
  product: productMock,
  quantity: 10,
  price: 1000,
  promotion: promotionMock,
}