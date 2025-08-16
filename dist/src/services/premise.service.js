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
exports.PremiseService = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
class PremiseService {
    getAllPremises() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            return yield database_1.db.query.premises.findMany({ offset: skip, limit: limit });
        });
    }
    getPremiseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.db.query.premises.findFirst({
                where: (premises, { eq }) => eq(premises.premise_code, id),
            });
        });
    }
    searchPremise(search) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.execute((0, drizzle_orm_1.sql) `SET pg_trgm.similarity_threshold = 0.2;`);
            return yield database_1.db.execute((0, drizzle_orm_1.sql) `
    SELECT *
    FROM premises
    WHERE
      premises.premise % ${search} OR
      premises.address % ${search} OR
      premises.premise_type % ${search} OR
      premises.state % ${search} OR
      premises.district % ${search}
    ORDER BY GREATEST(
      similarity(premises.premise, ${search}),
      similarity(premises.address, ${search}),
      similarity(premises.premise_type, ${search}),
      similarity(premises.state, ${search}),
      similarity(premises.district, ${search})
    ) DESC
    LIMIT 20;
  `);
        });
    }
    getLatestPriceByPremiseId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.db
                .select()
                .from(schema_1.itemsPremises)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.itemsPremises.premise_code, id), (0, drizzle_orm_1.eq)(schema_1.itemsPremises.date, (0, drizzle_orm_1.sql) `(SELECT MAX(${schema_1.itemsPremises.date}) FROM ${schema_1.itemsPremises} WHERE ${schema_1.itemsPremises.premise_code} = ${id})`)))
                .leftJoin(schema_1.items, (0, drizzle_orm_1.eq)(schema_1.items.item_code, schema_1.itemsPremises.item_code));
        });
    }
}
exports.PremiseService = PremiseService;
//# sourceMappingURL=premise.service.js.map