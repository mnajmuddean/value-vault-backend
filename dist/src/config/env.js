"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const envSchema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string(),
    PORT: zod_1.z
        .string()
        .transform(Number)
        .refine((n) => n >= 1024 && n <= 65535, {
        message: "Port must be between 1024 and 65535",
    }),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    FRONTEND_URL: zod_1.z.string().url(),
});
exports.ENV = envSchema.parse(process.env);
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
//# sourceMappingURL=env.js.map