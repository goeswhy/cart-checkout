import { Injectable } from "@nestjs/common";
import { CartProduct } from "src/cart/entities/cart-product.entity";
import { PromotionRule, PromotionRuleType } from "../entities/promotion-rule.entity";
import { MinQuantityStrategy } from "./strategies/promotion-rule-strategies/min-qty.strategy";

@Injectable()
export class PromotionRuleStrategyResolver {
  private readonly map = {
    [PromotionRuleType.MIN_QTY]: this.minQty,
  }

  constructor(private readonly minQty: MinQuantityStrategy) {}

  isEligible(
    promotionRule: PromotionRule,
    cartProduct: CartProduct
  ): boolean {
    const strategy = promotionRule.type;
    const strategyInstance = this.map[strategy];
    if (strategyInstance === undefined) throw new Error(`Undefined promotion strategy ${strategy}`);

    return strategyInstance.isEligible(promotionRule, cartProduct);
  }
}