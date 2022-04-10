import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Promotion } from "../entities/promotion.entity";
import { PromotionFinderService } from "./promotion.finder.service";

describe('PromotionFinderService', () => {
  let service: PromotionFinderService;
  let promotionRepositoryMock: any;

  const promotionRepositoryToken = getRepositoryToken(Promotion);

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionFinderService,
        {
          provide: promotionRepositoryToken,
          useValue: {
            find: jest.fn(),
          },
        }
      ],
    }).compile();

    service = moduleRef.get<PromotionFinderService>(PromotionFinderService);
    promotionRepositoryMock = moduleRef.get(promotionRepositoryToken);
  });

  it('defined', () => {
    expect(service).toBeDefined();
    expect(promotionRepositoryMock).toBeDefined();
  });

  describe('find', () => {
    it('update cart with promotion if eligible promotion for product found', () => {
      expect(true).toBeFalsy();
    });

    it('not update cart with promotion if eligible promotion for product found', () => {
      expect(true).toBeFalsy();
    });
  })
});