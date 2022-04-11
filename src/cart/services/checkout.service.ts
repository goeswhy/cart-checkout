import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PromotionFinderService } from "src/promotion/services/promotion.finder.service";
import { Repository } from "typeorm";
import { Cart } from "../entities/cart.entity";
import { InvalidCartException } from "../exceptions/invalid-cart.exception";
import { CheckoutResponse } from "../types/checkout.response";

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly promotionFinderService: PromotionFinderService
  ) {}

  async checkout(cartId: number): Promise<CheckoutResponse> {
    const cart = await this.cartRepository.findOne(cartId);
    if (cart === undefined) throw new InvalidCartException('Cannot find cart');

    const cartWithPromo = await this.promotionFinderService.find(cart);
    return {
      products: cartWithPromo.products,
      totalAmount: cartWithPromo.products
        .map((product) => product.price * product.quantity)
        .reduce((totalAmount, amount) => totalAmount + amount),
    }
  }
}