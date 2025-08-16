import { CalculateController } from '@/controllers/calculate.controller';
import { PremiseController } from '@/controllers/premise.controller';
import { asyncMiddleware, verifySecretKey } from '@/middleware/verifySecretKey';
import { CalculateService } from '@/services/calculate.service';
import { PremiseService } from '@/services/premise.service';
import { Router } from 'express';

const router = Router();
const calculateService = new CalculateService();
const calculateController = new CalculateController(calculateService);

router.get(
  '/',
  asyncMiddleware(verifySecretKey),
  calculateController.calculate
);
export default router;
