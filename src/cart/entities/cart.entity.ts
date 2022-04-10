import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cart-product.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  products: CartProduct[];
}