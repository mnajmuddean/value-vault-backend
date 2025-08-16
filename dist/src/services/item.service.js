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
exports.ItemService = void 0;
const database_1 = require("../config/database");
const drizzle_orm_1 = require("drizzle-orm");
class ItemService {
    getAllItems() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            return yield database_1.db.query.items.findMany({ offset: skip, limit: limit });
        });
    }
    getItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.db.query.items.findFirst({
                where: (items, { eq }) => eq(items.item_code, id),
            });
        });
    }
    searchItem(search) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.execute((0, drizzle_orm_1.sql) `SET pg_trgm.similarity_threshold = 0.2;`);
            return yield database_1.db.execute((0, drizzle_orm_1.sql) `
      SELECT *
      FROM items
      WHERE items.item % ${search}
      ORDER BY similarity(items.item, ${search}) DESC
      LIMIT 20;
    `);
        });
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map