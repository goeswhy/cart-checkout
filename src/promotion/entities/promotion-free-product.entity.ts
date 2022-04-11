import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromotionFreeProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ nullable: false, default: 1})
  maxItem: number;

  @Column({ nullable: false, default: 1})
  count: number;
}