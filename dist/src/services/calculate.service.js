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
exports.CalculateService = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class CalculateService {
    getLatestPrice(premise_code, item_code) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.db
                .select()
                .from(schema_1.itemsPremises)
                .leftJoin(schema_1.premises, (0, drizzle_orm_1.eq)(schema_1.itemsPremises.premise_code, schema_1.premises.premise_code))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.itemsPremises.premise_code, premise_code), (0, drizzle_orm_1.eq)(schema_1.itemsPremises.item_code, item_code)))
                .orderBy((0, drizzle_orm_1.desc)(schema_1.itemsPremises.date))
                .limit(1);
            return result[0];
        });
    }
}
exports.CalculateService = CalculateService;
//# sourceMappingURL=calculate.service.js.map