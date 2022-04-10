import { CartProduct } from "src/cart/entities/cart-product.entity";
import { PromotionRule } from "src/promotion/entities/promotion-rule.entity";

export interface IPromotionRuleStrategy {
  isEligible(promotionRule: PromotionRule, cartProduct: CartProduct): boolean;
}