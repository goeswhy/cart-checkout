import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PromotionFreeProduct } from "../../entities/promotion-free-product";
import { PromotionStrategy } from "../../entities/promotion.entity";
import { FreeProductStrategy } from "./free-product.strategy";
import { cartProductMock } from "./__mocks/cart-product.mock";
import { cartMock } from "./__mocks/cart.mock";
import { promotionFreeProductMock } from "./__mocks/promotion-free-product.mock";
import { promotionMock } from "./__mocks/promotion.mock";

describe('FreeProductStrategy', () => {
  let strategy: FreeProductStrategy;
  let repositoryMock: any;
  const repositoryToken = getRepositoryToken(PromotionFreeProduct);
  const updatedPromotionMock = {
    ...promotionMock,
    ...{ strategy: PromotionStrategy.GET_FREE_PRODUCT }
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FreeProductStrategy,
        {
          provide: repositoryToken,
          useValue: {
            findOne: jest.fn(),
          }
        }
      ],
    }).compile();

    strategy = moduleRef.get<FreeProductStrategy>(FreeProductStrategy);
    repositoryMock = moduleRef.get(repositoryToken);
  });

  afterEach(() => jest.resetAllMocks())

  it('defined', () => {
    expect(strategy).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  describe('apply', () => {
    it('apply bonus product when eligible', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(promotionFreeProductMock);
      const actual = await strategy.apply(cartMock, updatedPromotionMock, cartProductMock);
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
          {
            product: {
              id: 1,
              name: "Macbook Pro",
              sku: "sku-1",
              stock: 5,
              price: 300,
            },
            quantity: 1,
            price: 0,
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
              strategy: "get-free-same-product",
            },
          },
        ],
      });
    });

    it('skip apply bonus product when not eligible', async () => {
      jest.spyOn(repositoryMock, 'findOne').mockResolvedValueOnce(undefined);
      const actual = await strategy.apply(cartMock, updatedPromotionMock, cartProductMock);
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
  });
});