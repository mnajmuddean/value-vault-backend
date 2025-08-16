import { db } from '@/config/database';

export class AuthService {
  async getSecretByClientID(portal_id: string) {
    return await db.query.secretCredentials.findFirst({
      where: (secretCredentials, { eq }) =>
        eq(secretCredentials.portal_id, portal_id),
    });
  }
}
