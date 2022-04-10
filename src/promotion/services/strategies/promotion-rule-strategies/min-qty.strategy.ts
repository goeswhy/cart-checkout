import { CartProduct } from "src/cart/entities/cart-product.entity";
import { PromotionRule } from "src/promotion/entities/promotion-rule.entity";
import { IPromotionRuleStrategy } from "./irule-strategy";

export class MinQuantityStrategy implements IPromotionRuleStrategy {
  isEligible(promotionRule: PromotionRule, cartProduct: CartProduct): boolean {
    return cartProduct.quantity >= promotionRule.value;
  }
}