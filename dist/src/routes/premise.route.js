"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const premise_controller_1 = require("../controllers/premise.controller");
const verifySecretKey_1 = require("../middleware/verifySecretKey");
const premise_service_1 = require("../services/premise.service");
const express_1 = require("express");
const router = (0, express_1.Router)();
const premiseService = new premise_service_1.PremiseService();
const premiseController = new premise_controller_1.PremiseController(premiseService);
router.get('/search', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), premiseController.search);
router.get('/', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), premiseController.getAll);
router.get('/:id/latest', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), premiseController.getLatestPriceByPremiseID);
router.get('/:id', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), premiseController.getOne);
exports.default = router;
//# sourceMappingURL=premise.route.js.map