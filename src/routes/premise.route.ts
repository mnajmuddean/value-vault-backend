import { PremiseController } from '@/controllers/premise.controller';
import { asyncMiddleware, verifySecretKey } from '@/middleware/verifySecretKey';
import { PremiseService } from '@/services/premise.service';
import { Router } from 'express';

const router = Router();
const premiseService = new PremiseService();
const premiseController = new PremiseController(premiseService);

router.get(
  '/search',
  asyncMiddleware(verifySecretKey),
  premiseController.search
);
router.get('/', asyncMiddleware(verifySecretKey), premiseController.getAll);
router.get(
  '/:id/latest',
  asyncMiddleware(verifySecretKey),
  premiseController.getLatestPriceByPremiseID
);
router.get('/:id', asyncMiddleware(verifySecretKey), premiseController.getOne);
export default router;
