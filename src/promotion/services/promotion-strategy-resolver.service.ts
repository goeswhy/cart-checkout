import { Injectable } from "@nestjs/common";
import { CartProduct } from "src/cart/entities/cart-product.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Promotion, PromotionStrategy } from "../entities/promotion.entity";
import { DiscountStrategy } from "./strategies/discount.strategy";
import { FreeProductStrategy } from "./strategies/free-product.strategy";

@Injectable()
export class PromotionStrategyResolver {
  private readonly map = {
    [PromotionStrategy.DISCOUNT]: this.discount,
    [PromotionStrategy.GET_FREE_PRODUCT]: this.freeProduct,
  };

  constructor(
    private readonly discount: DiscountStrategy,
    private readonly freeProduct: FreeProductStrategy,
  ) {}

  async apply(
    strategy: PromotionStrategy,
    cart: Cart,
    promotion: Promotion,
    cartProduct: CartProduct,
  ): Promise<Cart> {
    const strategyInstance = this.map[strategy];
    if (strategyInstance === undefined) throw new Error(`Undefined promotion strategy ${strategy}`);

    return await strategyInstance.apply(cart, promotion, cartProduct);
  }
}