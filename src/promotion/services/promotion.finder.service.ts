import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/cart/entities/cart.entity";
import { Repository } from "typeorm";
import { Promotion } from "../entities/promotion.entity";
import { IPromotionFinderService } from "./ipromotion-finder.service";
import { PromotionRuleStrategyResolver } from "./promotion-rule-strategy-resolver.service";
import { PromotionStrategyResolver } from "./promotion-strategy-resolver.service";

@Injectable()
export class PromotionFinderService implements IPromotionFinderService {
  constructor(
    @InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>,
    private readonly ruleStrategyResolver: PromotionRuleStrategyResolver,
    private readonly promotionStrategyResolver: PromotionStrategyResolver,
  ) {}

  async find(cart: Cart): Promise<Cart> {
    let checkedCart = { ...cart }; 

    for(const cartProduct of checkedCart.products) {
      const promotion = await this.promotionRepository.findOne({ product: cartProduct.product});
      if (promotion) {
        const isEligibleForPromo = await Promise.all(
          promotion.rules.map(async (rule) => {
            return this.ruleStrategyResolver.isEligible(rule, cartProduct);
          })
        );

        if (isEligibleForPromo.filter(isEligible => isEligible === true).length === promotion.rules.length) {
          checkedCart = await this.promotionStrategyResolver.apply(promotion.strategy, checkedCart, promotion, cartProduct);
        }
      }
    }

    return checkedCart;
  }
}
