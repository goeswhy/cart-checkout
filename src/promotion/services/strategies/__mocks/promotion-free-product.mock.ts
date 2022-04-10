import { PromotionFreeProduct } from "src/promotion/entities/promotion-free-product";
import { productMock } from "./cart-product.mock";

export const promotionFreeProductMock: PromotionFreeProduct = {
  id: 1,
  count: 1,
  maxItem: 1,
  product: productMock,
}