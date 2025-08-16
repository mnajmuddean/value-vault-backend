import { db } from '@/config/database';
import { sql } from 'drizzle-orm';

export class ItemService {
  async getAllItems(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await db.query.items.findMany({ offset: skip, limit: limit });
  }

  async getItemById(id: number) {
    return await db.query.items.findFirst({
      where: (items, { eq }) => eq(items.item_code, id),
    });
  }

  async searchItem(search: string) {
    await db.execute(sql`SET pg_trgm.similarity_threshold = 0.2;`);
    return await db.execute(sql`
      SELECT *
      FROM items
      WHERE items.item % ${search}
      ORDER BY similarity(items.item, ${search}) DESC
      LIMIT 20;
    `);
  }
}
