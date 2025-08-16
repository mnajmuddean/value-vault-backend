"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_controller_1 = require("../controllers/calculate.controller");
const verifySecretKey_1 = require("../middleware/verifySecretKey");
const calculate_service_1 = require("../services/calculate.service");
const express_1 = require("express");
const router = (0, express_1.Router)();
const calculateService = new calculate_service_1.CalculateService();
const calculateController = new calculate_controller_1.CalculateController(calculateService);
router.get('/', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), calculateController.calculate);
exports.default = router;
//# sourceMappingURL=calculate.routes.js.map