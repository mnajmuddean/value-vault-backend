"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(99),
        email: zod_1.z.string().email().max(99),
        password: zod_1.z.string().min(8).max(100),
        role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(99).optional(),
        email: zod_1.z.string().email().max(99).optional(),
        role: zod_1.z.enum(["ADMIN", "USER"]).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
//# sourceMappingURL=user.validator.js.map