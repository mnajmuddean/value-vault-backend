import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform(Number)
    .refine((n) => n >= 1024 && n <= 65535, {
      message: "Port must be between 1024 and 65535",
    }),
  NODE_ENV: z.enum(["development", "production", "test"]),
  FRONTEND_URL: z.string().url(),
});

export const ENV = envSchema.parse(process.env);

// Add validation for production environment
if (process.env.NODE_ENV === "production") {
  const requiredFields = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
  ];

  requiredFields.forEach((field) => {
    if (!process.env[field]) {
      throw new Error(`Missing required env variable: ${field}`);
    }
  });
}
