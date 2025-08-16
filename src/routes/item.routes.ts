import { Router } from 'express';
import { cache } from '@/middleware/cacheMiddleware';
import { ItemService } from '@/services/item.service';
import { ItemController } from '@/controllers/item.controller';
import { validateRequest } from '@/middleware/validateRequest';
import { asyncMiddleware, verifySecretKey } from '@/middleware/verifySecretKey';

const router = Router();
const itemService = new ItemService();
const itemController = new ItemController(itemService);

router.get(
  '/search',
  asyncMiddleware(verifySecretKey),
  asyncMiddleware(itemController.search)
);
router.get(
  '/',
  asyncMiddleware(verifySecretKey),
  asyncMiddleware(itemController.getAll)
);
router.get(
  '/:id',
  asyncMiddleware(verifySecretKey),
  asyncMiddleware(itemController.getOne)
);
export default router;
