"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretCredentials = exports.itemsPremises = exports.items = exports.premises = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// Premises table
exports.premises = (0, pg_core_1.pgTable)('premises', {
    premise_code: (0, pg_core_1.serial)('premise_code').primaryKey(),
    premise: (0, pg_core_1.text)('premise').notNull(),
    address: (0, pg_core_1.text)('address').notNull(),
    premise_type: (0, pg_core_1.text)('premise_type').notNull(),
    state: (0, pg_core_1.text)('state').notNull(),
    district: (0, pg_core_1.text)('district').notNull(),
});
// Items table
exports.items = (0, pg_core_1.pgTable)('items', {
    item_code: (0, pg_core_1.serial)('item_code').primaryKey(),
    item: (0, pg_core_1.text)('item').notNull(),
    unit: (0, pg_core_1.text)('unit').notNull(),
    item_group: (0, pg_core_1.text)('item_group').notNull(),
    item_category: (0, pg_core_1.text)('item_category').notNull(),
});
// Junction table for items at premises with pricing
exports.itemsPremises = (0, pg_core_1.pgTable)('items_premises', {
    date: (0, pg_core_1.date)('date').notNull(),
    premise_code: (0, pg_core_1.integer)('premise_code').notNull(),
    item_code: (0, pg_core_1.integer)('item_code').notNull(),
    price: (0, pg_core_1.decimal)('price', { precision: 10, scale: 2 }).notNull(),
}, (table) => ({
    pk: (0, pg_core_1.primaryKey)({
        columns: [table.date, table.premise_code, table.item_code],
    }),
}));
// Secrets table
exports.secretCredentials = (0, pg_core_1.pgTable)('secret_credentials', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    portal_id: (0, pg_core_1.uuid)('portal_id').notNull(),
    secret: (0, pg_core_1.text)('secret').notNull(),
});
//# sourceMappingURL=schema.js.map