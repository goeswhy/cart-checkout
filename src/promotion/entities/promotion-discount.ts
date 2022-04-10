import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromotionDiscount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 2, scale: 10, nullable: false, default: 0})
  value: number;
}