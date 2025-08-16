import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { AppError } from '@/utils/appError';
import { ItemService } from '@/services/item.service';

export class ItemController extends BaseController {
  constructor(private itemService: ItemService) {
    super();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Extract pagination parameters from query string
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Validate pagination parameters
    if (page < 1) {
      throw new AppError('Page must be greater than 0', 400);
    }
    if (limit < 1 || limit > 100) {
      throw new AppError('Limit must be between 1 and 100', 400);
    }

    await this.handleRequest(req, res, next, async () => {
      return await this.itemService.getAllItems(page, limit);
    });
  };

  getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const id = Number(req.params.id);
      return await this.itemService.getItemById(id);
    });
  };

  search = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await this.handleRequest(req, res, next, async () => {
      const key = (req.query.key as string) || '';
      return await this.itemService.searchItem(key);
    });
  };
}
