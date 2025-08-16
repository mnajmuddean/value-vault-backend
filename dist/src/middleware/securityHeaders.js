"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSecurityHeaders = void 0;
const helmet_1 = __importDefault(require("helmet"));
const env_1 = require("../config/env");
const setupSecurityHeaders = (app) => {
    // Remove the X-Powered-By header to avoid exposing the technology stack
    app.disable("x-powered-by");
    // Configure Helmet middleware with comprehensive security headers
    app.use((0, helmet_1.default)({
        // Content Security Policy (CSP) - Controls which resources can be loaded
        contentSecurityPolicy: {
            directives: Object.assign({ defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], styleSrc: ["'self'", "'unsafe-inline'"], imgSrc: ["'self'", "data:", "https:"], connectSrc: ["'self'", env_1.ENV.FRONTEND_URL], fontSrc: ["'self'", "https:", "data:"], objectSrc: ["'none'"], mediaSrc: ["'none'"], frameSrc: ["'none'"], frameAncestors: ["'none'"], formAction: ["'self'"] }, (env_1.ENV.NODE_ENV === 'production' ? {
                upgradeInsecureRequests: [], // Force HTTPS in production
                blockAllMixedContent: [] // Block mixed content in production
            } : {}))
        },
        // Cross-Origin Policies
        crossOriginEmbedderPolicy: false, // Required for Swagger UI
        crossOriginOpenerPolicy: { policy: "same-origin" }, // Isolate cross-origin windows
        crossOriginResourcePolicy: { policy: "same-origin" }, // Restrict cross-origin resource sharing
        // Browser Feature Policies
        dnsPrefetchControl: { allow: false }, // Disable DNS prefetching
        frameguard: { action: "deny" }, // Prevent clickjacking
        hsts: {
            maxAge: 31536000, // 1 year in seconds
            includeSubDomains: true, // Apply to subdomains
            preload: true // Allow preloading HSTS
        },
        ieNoOpen: true, // Prevent IE from executing downloads
        noSniff: true, // Prevent MIME type sniffing
        originAgentCluster: true, // Improve performance isolation
        permittedCrossDomainPolicies: { permittedPolicies: "none" }, // Restrict Adobe Flash and PDFs
        referrerPolicy: { policy: "no-referrer" }, // Control referrer information
        xssFilter: true // Enable XSS filtering
    }));
    // Additional custom security headers
    app.use((req, res, next) => {
        // Restrict browser features and APIs
        res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
        res.setHeader('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
        res.setHeader('X-Frame-Options', 'DENY'); // Prevent clickjacking
        res.setHeader('X-XSS-Protection', '1; mode=block'); // Enable XSS protection
        next();
    });
    // Production-specific CORS configuration
    if (env_1.ENV.NODE_ENV === 'production') {
        app.use((req, res, next) => {
            const allowedOrigins = [env_1.ENV.FRONTEND_URL]; // Whitelist of allowed origins
            const origin = req.headers.origin;
            // Only allow requests from whitelisted origins
            if (origin && allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            }
            next();
        });
    }
};
exports.setupSecurityHeaders = setupSecurityHeaders;
//# sourceMappingURL=securityHeaders.js.map