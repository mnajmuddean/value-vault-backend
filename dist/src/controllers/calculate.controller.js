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
exports.CalculateController = void 0;
const base_controller_1 = require("./base.controller");
const appError_1 = require("../utils/appError");
class CalculateController extends base_controller_1.BaseController {
    constructor(calculateService) {
        super();
        this.calculateService = calculateService;
        this.calculate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            yield this.handleRequest(req, res, next, () => __awaiter(this, void 0, void 0, function* () {
                const first_premise_code = Number(req.query.premise_code_1);
                const second_premise_code = Number(req.query.premise_code_2);
                const item_code = Number(req.query.item_code);
                const first_premise = yield this.calculateService.getLatestPrice(first_premise_code, item_code);
                const second_premise = yield this.calculateService.getLatestPrice(second_premise_code, item_code);
                if (first_premise === undefined || second_premise === undefined) {
                    return next(new appError_1.AppError('Premise not found', 404));
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
                    averagePrice: (Number(first_premise.items_premises.price) +
                        Number(second_premise.items_premises.price)) /
                        2,
                    maxDifference: Math.max(...prices) - Math.min(...prices),
                    bestDealpremise_code: price1 < price2
                        ? first_premise
                        : price2 < price1
                            ? second_premise
                            : null,
                };
            }));
        });
    }
}
exports.CalculateController = CalculateController;
//# sourceMappingURL=calculate.controller.js.map