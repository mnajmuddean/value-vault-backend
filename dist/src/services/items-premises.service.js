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
exports.ItemsPremisesService = void 0;
const database_1 = require("../config/database");
class ItemsPremisesService {
    getLatestPrice(premise_code, item_code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.db.query.itemsPremises.findFirst({
                where: (itemsPremises, { and, eq }) => and(eq(itemsPremises.premise_code, premise_code), eq(itemsPremises.item_code, item_code)),
                orderBy: (itemsPremises, { desc }) => [itemsPremises.date],
            });
        });
    }
}
exports.ItemsPremisesService = ItemsPremisesService;
//# sourceMappingURL=items-premises.service.js.map