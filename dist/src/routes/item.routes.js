"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_service_1 = require("../services/item.service");
const item_controller_1 = require("../controllers/item.controller");
const verifySecretKey_1 = require("../middleware/verifySecretKey");
const router = (0, express_1.Router)();
const itemService = new item_service_1.ItemService();
const itemController = new item_controller_1.ItemController(itemService);
router.get('/search', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), (0, verifySecretKey_1.asyncMiddleware)(itemController.search));
router.get('/', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), (0, verifySecretKey_1.asyncMiddleware)(itemController.getAll));
router.get('/:id', (0, verifySecretKey_1.asyncMiddleware)(verifySecretKey_1.verifySecretKey), (0, verifySecretKey_1.asyncMiddleware)(itemController.getOne));
exports.default = router;
//# sourceMappingURL=item.routes.js.map