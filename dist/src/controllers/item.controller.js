"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const base_controller_1 = require("./base.controller");
const appError_1 = require("../utils/appError");
class ItemController extends base_controller_1.BaseController {
    constructor(itemService) {
        super();
        this.itemService = itemService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // Extract pagination parameters from query string
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            // Validate pagination parameters
            if (page < 1) {
                throw new appError_1.AppError('Page must be greater than 0', 400);
            }
            if (limit < 1 || limit > 100) {
                throw new appError_1.AppError('Limit must be between 1 and 100', 400);
            }
            yield this.handleRequest(req, res, next, () => __awaiter(this, void 0, void 0, function* () {
                return yield this.itemService.getAllItems(page, limit);
            }));
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.handleRequest(req, res, next, () => __awaiter(this, void 0, void 0, function* () {
                const id = Number(req.params.id);
                return yield this.itemService.getItemById(id);
            }));
        });
        this.search = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.handleRequest(req, res, next, () => __awaiter(this, void 0, void 0, function* () {
                const key = req.query.key || '';
                return yield this.itemService.searchItem(key);
            }));
        });
    }
}
exports.ItemController = ItemController;
//# sourceMappingURL=item.controller.js.map