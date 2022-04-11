import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionDiscount } from './entities/promotion-discount.entity';
import { PromotionFreeProduct } from './entities/promotion-free-product.entity';
import { PromotionRule } from './entities/promotion-rule.entity';
import { Promotion } from './entities/promotion.entity';
import { PromotionRuleStrategyResolver } from './services/promotion-rule-strategy-resolver.service';
import { PromotionStrategyResolver } from './services/promotion-strategy-resolver.service';
import { PromotionFinderService } from './services/promotion.finder.service';
import { MinQuantityStrategy } from './services/strategies/promotion-rule-strategies/min-qty.strategy';
import { DiscountStrategy } from './services/strategies/promotion-strategies/discount.strategy';
import { FreeProductStrategy } from './services/strategies/promotion-strategies/free-product.strategy';

@Module({
  exports: [ PromotionFinderService ],
  providers: [
    PromotionFinderService,
    PromotionStrategyResolver,
    PromotionRuleStrategyResolver,
    DiscountStrategy,
    FreeProductStrategy,
    MinQuantityStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([
      PromotionFreeProduct,
      PromotionRule,
      Promotion,
      PromotionDiscount,
    ]),
  ],
})

export class PromotionModule {}
