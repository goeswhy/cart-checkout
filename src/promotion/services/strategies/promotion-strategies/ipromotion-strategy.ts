import { CartProduct } from "src/cart/entities/cart-product.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";

export interface IPromotionApplyStrategy<T> {
  apply(
    cart: Cart,
    promotion: Promotion,
    cartProduct: CartProduct,
  ): Promise<T>;
}
