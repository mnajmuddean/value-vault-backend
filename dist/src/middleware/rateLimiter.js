"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationLimiter = exports.apiLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Reduced from 100 to 50 attempts per window
    message: {
        success: false,
        message: "Too many login attempts, please try again later",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'];
    },
    skipSuccessfulRequests: true // Only count failed attempts
});
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 50, // Reduced from 100 to 50 requests per 15 minutes
    message: {
        success: false,
        message: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        var _a;
        return Boolean(req.path.startsWith('/monitoring') || // TODO: Skip all monitoring endpoints for now
            ((_a = req.headers['user-agent']) === null || _a === void 0 ? void 0 : _a.includes('Prometheus')));
    }
});
exports.verificationLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
    message: {
        success: false,
        message: "Too many verification attempts, please try again later",
    },
});
//# sourceMappingURL=rateLimiter.js.map