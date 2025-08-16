import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { AppError } from '@/utils/appError';
import { CalculateService } from '@/services/calculate.service';

export class CalculateController extends BaseController {
  constructor(private calculateService: CalculateService) {
    super();
  }

  calculate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const first_premise_code = Number(req.query.premise_code_1);
      const second_premise_code = Number(req.query.premise_code_2);
      const item_code = Number(req.query.item_code);

      const first_premise = await this.calculateService.getLatestPrice(
        first_premise_code,
        item_code
      );

      const second_premise = await this.calculateService.getLatestPrice(
        second_premise_code,
        item_code
      );

      if (first_premise === undefined || second_premise === undefined) {
        return next(new AppError('Premise not found', 404));
      }

      const prices = [
        Number(first_premise.items_premises.price),
        Number(second_premise.items_premises.price),
      ];

      const price1 = Number(first_premise.items_premises.price);
      const price2 = Number(second_premise.items_premises.price);

      return {
        lowestPrice: Math.min(...prices),
        highestPrice: Math.max(...prices),
        averagePrice:
          (Number(first_premise.items_premises.price) +
            Number(second_premise.items_premises.price)) /
          2,
        maxDifference: Math.max(...prices) - Math.min(...prices),
        bestDealpremise_code:
          price1 < price2
            ? first_premise
            : price2 < price1
              ? second_premise
              : null,
      };
    });
  };
}
