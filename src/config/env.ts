import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform(Number)
    .refine((n) => n >= 1024 && n <= 65535, {
      message: 'Port must be between 1024 and 65535',
    }),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  FRONTEND_URL: z.string().url(),
});

export const ENV = envSchema.parse(process.env);
