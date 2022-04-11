import { InjectRepository } from "@nestjs/typeorm";
import { CartProduct } from "src/cart/entities/cart-product.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { PromotionDiscount } from "src/promotion/entities/promotion-discount.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Repository } from "typeorm";
import { IPromotionApplyStrategy } from "./ipromotion-strategy";

export class DiscountStrategy implements IPromotionApplyStrategy<Cart> {
  constructor(
    @InjectRepository(PromotionDiscount) private readonly promotionDiscountRepository: Repository<PromotionDiscount>
  ) {}

  async apply(cart: Cart, promotion: Promotion, cartProduct: CartProduct): Promise<Cart> {
    const discount = await this.promotionDiscountRepository.findOne(promotion.id);
    if (!discount) return cart;

    const appliedProduct = { ...cartProduct };
    const appliedCart = { ...cart };
    appliedProduct.promotion = promotion;
    appliedProduct.price = appliedProduct.price - (appliedProduct.price * discount.value / 100);

    appliedCart.products = cart.products.map((product) => {
      if (product.id === appliedProduct.id) return appliedProduct;
      return product;
    });

    return appliedCart;
  }
}
