import { Body, Controller, Param, Post, UnprocessableEntityException } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiParam, ApiRequestTimeoutResponse } from "@nestjs/swagger";
import { InvalidCartException } from "../exceptions/invalid-cart.exception";
import { CheckoutService } from "../services/checkout.service";
import { CheckoutRequest } from "../types/checkout.request";
import { CheckoutResponse } from "../types/checkout.response";

@Controller('carts')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('checkout')
  @ApiOkResponse({ type: CheckoutResponse })
  @ApiBody({ type: CheckoutRequest })
  async checkout(@Body() param: CheckoutRequest): Promise<CheckoutResponse> {
    try {
      return await this.checkoutService.checkout(param.cartId);
    } catch (error) {
      if (error instanceof InvalidCartException || error.name === 'InvalidCartException') {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }
}