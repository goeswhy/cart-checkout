import { InjectRepository } from "@nestjs/typeorm";
import { CartProduct } from "src/cart/entities/cart-product.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { PromotionFreeProduct } from "src/promotion/entities/promotion-free-product";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Repository } from "typeorm";
import { IPromotionApplyStrategy } from "./ipromotion-strategy";

export class FreeProductStrategy implements IPromotionApplyStrategy<Cart> {
  constructor(
    @InjectRepository(PromotionFreeProduct) private readonly freeProductRepository: Repository<PromotionFreeProduct>
  ) { }

  async apply(cart: Cart, promotion: Promotion, _cartProduct: CartProduct): Promise<Cart> {
    const freeProduct = await this.freeProductRepository.findOne(promotion.id);
    if (!freeProduct) return cart;

    const appliedCart = { ...cart };
    const bonusProduct = this.getBonusProduct(freeProduct, promotion);
    appliedCart.products.push(bonusProduct);

    return appliedCart;
  }

  private getBonusProduct(freeProduct: PromotionFreeProduct, promotion: Promotion) {
    const bonusProduct = new CartProduct();
    bonusProduct.product = freeProduct.product;
    bonusProduct.quantity = freeProduct.count;
    bonusProduct.price = 0;
    bonusProduct.promotion = promotion;

    return bonusProduct;
  }
}
