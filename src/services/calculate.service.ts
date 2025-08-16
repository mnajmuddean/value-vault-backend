import { db } from '@/config/database';
import { itemsPremises, premises } from '@/db/schema';
import { and, eq, sql, desc } from 'drizzle-orm';

export class CalculateService {
  async getLatestPrice(premise_code: number, item_code: number) {
    const result = await db
      .select()
      .from(itemsPremises)
      .leftJoin(premises, eq(itemsPremises.premise_code, premises.premise_code))
      .where(
        and(
          eq(itemsPremises.premise_code, premise_code),
          eq(itemsPremises.item_code, item_code)
        )
      )
      .orderBy(desc(itemsPremises.date))
      .limit(1);

    return result[0];
  }
}
