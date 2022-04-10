import { Promotion } from "src/promotion/entities/promotion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  sku: string

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, default: 0 })
  stock: number;
  
  @Column({ nullable: false, default: 0.00, type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Promotion, (promotion) => promotion.product)
  promotions?: Promotion[]
}