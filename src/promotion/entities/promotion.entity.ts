import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PromotionRule } from "./promotion-rule.entity";

export enum PromotionStrategy {
  DISCOUNT = 'discount',
  GET_FREE_PRODUCT = 'get-free-same-product',
}

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PromotionRule, (PromotionRule) => PromotionRule.promotion)
  rules: PromotionRule[];

  @ManyToOne(() => Product, (product) => product.promotions)
  product: Product;

  @Column({ enum: PromotionStrategy, nullable: false })
  strategy: PromotionStrategy;

  // Polymmorhic value
  @Column()
  promotionValueId: number;
}