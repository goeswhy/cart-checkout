import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PromotionDiscount } from "src/promotion/entities/promotion-discount";
import { DiscountStrategy } from "./discount.strategy";
import { cartProductMock } from "./__mocks/cart-product.mock";
import { cartMock } from "./__mocks/cart.mock";
import { promotionDiscountMock } from "./__mocks/promotion-discount.mock";
import { promotionMock } from "./__mocks/promotion.mock";

describe('DiscountStrategy', () => {
  let strategy: DiscountStrategy;
  let repositoryMock: any;
  const repositoryToken = getRepositoryToken(PromotionDiscount);

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DiscountStrategy,
        {
          provide: repositoryToken,
          useValue: {
            findOne: jest.fn()
          }
        }
      ],
    }).compile();

    strategy = moduleRef.get<DiscountStrategy>(DiscountStrategy);
    repositoryMock = moduleRef.get(repositoryToken);
  });

  afterEach(() => jest.resetAllMocks())

  it('defined', () => {
    expect(strategy).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  describe('apply', () => {
    it('apply discount when eligible', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(promotionDiscountMock);
      const actual = await strategy.apply(cartMock, promotionMock, cartProductMock);
      expect(actual).toEqual({
        id: 1,
        products: [
          {
            id: 1,
            price: 270,
            quantity: 1,
            product: {
              id: 1,
              name: "Macbook Pro",
              sku: "sku-1",
              stock: 5,
              price: 300,
            },
            promotion: {
              id: 1,
              product: {
                id: 1,
                name: "Macbook Pro",
                sku: "sku-1",
                stock: 5,
                price: 300,
              },
              rules: [
              ],
              promotionValueId: 1,
              strategy: "discount",
            },
          },
        ],
      });
    });

    it('skip apply discount when not eligible', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(undefined);
      const actual = await strategy.apply(cartMock, promotionMock, cartProductMock);
      expect(actual).toEqual({
        id: 1,
        products: [
          {
            id: 1,
            price: 300,
            quantity: 1,
            product: {
              id: 1,
              name: "Macbook Pro",
              sku: "sku-1",
              stock: 5,
              price: 300,
            },
          },
        ],
      });
    });
  })
});