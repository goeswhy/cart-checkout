import { Cart } from "src/cart/entities/cart.entity";

export interface IPromotionFinderService {
  find(cart: Cart): Promise<Cart>;
}