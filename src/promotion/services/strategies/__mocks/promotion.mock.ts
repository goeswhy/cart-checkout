import { Promotion, PromotionStrategy } from "src/promotion/entities/promotion.entity";
import { productMock } from "./cart-product.mock";

export const promotionMock: Promotion = {
  id: 1,
  product: productMock,
  rules: [],
  promotionValueId: 1,
  strategy: PromotionStrategy.DISCOUNT
}