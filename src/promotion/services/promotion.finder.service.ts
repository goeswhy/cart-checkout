import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/cart/entities/cart.entity";
import { Repository } from "typeorm";
import { Promotion } from "../entities/promotion.entity";

export class PromotionFinderService {
  constructor(@InjectRepository(Promotion) private readonly promotionRepository: Repository<Promotion>) {}

  async find(cart: Cart): Promise<Cart> {
    const checkedProductId = [];

    for(const cartProduct of cart.products) {
    }
  }
}
