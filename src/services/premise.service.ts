import { db } from '@/config/database';
import { items, itemsPremises } from '@/db/schema';
import { eq, sql, and } from 'drizzle-orm';

export class PremiseService {
  async getAllPremises(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await db.query.premises.findMany({ offset: skip, limit: limit });
  }

  async getPremiseById(id: number) {
    return await db.query.premises.findFirst({
      where: (premises, { eq }) => eq(premises.premise_code, id),
    });
  }

  async searchPremise(search: string) {
    await db.execute(sql`SET pg_trgm.similarity_threshold = 0.2;`);

    return await db.execute(sql`
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
  }

  async getLatestPriceByPremiseId(id: number) {
    return await db
      .select()
      .from(itemsPremises)
      .where(
        and(
          eq(itemsPremises.premise_code, id),
          eq(
            itemsPremises.date,
            sql`(SELECT MAX(${itemsPremises.date}) FROM ${itemsPremises} WHERE ${itemsPremises.premise_code} = ${id})`
          )
        )
      )
      .leftJoin(items, eq(items.item_code, itemsPremises.item_code));
  }
}
