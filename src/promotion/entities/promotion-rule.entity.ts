import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Promotion } from "./promotion.entity";

export enum PromotionRuleType {
  MIN_QTY = 'min-qty',
}

@Entity()
export class PromotionRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: PromotionRuleType, nullable: false })
  type: PromotionRuleType

  @Column({ nullable: false })
  value: number;

  @ManyToOne(() => Promotion, (promotion) => promotion.rules)
  promotion: Promotion;
}