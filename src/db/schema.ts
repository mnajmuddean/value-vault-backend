import {
  pgTable,
  text,
  decimal,
  date,
  primaryKey,
  serial,
  integer,
  uuid,
} from 'drizzle-orm/pg-core';

// Premises table
export const premises = pgTable('premises', {
  premise_code: serial('premise_code').primaryKey(),
  premise: text('premise').notNull(),
  address: text('address').notNull(),
  premise_type: text('premise_type').notNull(),
  state: text('state').notNull(),
  district: text('district').notNull(),
});

// Items table
export const items = pgTable('items', {
  item_code: serial('item_code').primaryKey(),
  item: text('item').notNull(),
  unit: text('unit').notNull(),
  item_group: text('item_group').notNull(),
  item_category: text('item_category').notNull(),
});

// Junction table for items at premises with pricing
export const itemsPremises = pgTable(
  'items_premises',
  {
    date: date('date').notNull(),
    premise_code: integer('premise_code').notNull(),
    item_code: integer('item_code').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.date, table.premise_code, table.item_code],
    }),
  })
);

// Secrets table
export const secretCredentials = pgTable('secret_credentials', {
  id: serial('id').primaryKey(),
  portal_id: uuid('portal_id').notNull(),
  secret: text('secret').notNull(),
});

// Type exports for TypeScript
export type Premise = typeof premises.$inferSelect;
export type NewPremise = typeof premises.$inferInsert;

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

export type ItemPremise = typeof itemsPremises.$inferSelect;
export type NewItemPremise = typeof itemsPremises.$inferInsert;
