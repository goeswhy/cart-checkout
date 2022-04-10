import { Product } from "src/product/entities/product.entity";
import { Promotion } from "src/promotion/entities/promotion.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";

@Entity()
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ nullable: false, default: 0 })
  quantity: number;

  @Column({ nullable: false, default: 0.00, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Promotion)
  promotion?: Promotion;

  @ManyToOne(() => Cart)
  cart?: Cart;
}