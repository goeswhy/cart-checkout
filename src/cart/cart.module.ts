import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionModule } from 'src/promotion/promotion.module';
import { CheckoutController } from './controllers/checkout.controller';
import { CartProduct } from './entities/cart-product.entity';
import { Cart } from './entities/cart.entity';
import { CheckoutService } from './services/checkout.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Cart, CartProduct ]),
    PromotionModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CartModule {}
