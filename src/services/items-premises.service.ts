import { db } from '@/config/database';
import { sql } from 'drizzle-orm';

export class ItemsPremisesService {
  async getLatestPrice(premise_code: number, item_code: number) {
    return await db.query.itemsPremises.findFirst({
      where: (itemsPremises, { and, eq }) =>
        and(
          eq(itemsPremises.premise_code, premise_code),
          eq(itemsPremises.item_code, item_code)
        ),
      orderBy: (itemsPremises, { desc }) => [itemsPremises.date],
    });
  }
}
