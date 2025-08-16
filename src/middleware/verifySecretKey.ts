import { AuthService } from '@/services/auth.service';
import { Request, Response, NextFunction } from 'express';

export async function verifySecretKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const clientID = req.headers['x-portal-id'];
  const clientKey = req.headers['x-api-key'];

  if (clientID === undefined || clientKey === undefined) {
    return res
      .status(403)
      .json({ message: 'Forbidden - Missing API key or portal ID' });
  }

  const clientInfo = await new AuthService().getSecretByClientID(
    clientID as string
  );

  if (clientInfo === undefined) {
    return res.status(404).json({ message: 'Portal not found' });
  }

  if (clientInfo.secret !== clientKey) {
    return res.status(403).json({ message: 'Forbidden - Invalid API key' });
  }

  next();
}

// Helper to wrap async middleware
export function asyncMiddleware(handler: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
