"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const securityHeaders_1 = require("./middleware/securityHeaders");
const rateLimiter_1 = require("./middleware/rateLimiter");
const rateLimiter_2 = require("./middleware/rateLimiter");
const cors_1 = __importDefault(require("cors"));
const requestId_1 = require("./middleware/requestId");
const loggingMiddleware_1 = require("./middleware/loggingMiddleware");
const performanceMiddleware_1 = require("./middleware/performanceMiddleware");
const errorMonitoring_service_1 = require("./services/errorMonitoring.service");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./docs/swagger");
const notFound_1 = require("./middleware/notFound");
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const premise_route_1 = __importDefault(require("./routes/premise.route"));
const calculate_routes_1 = __importDefault(require("./routes/calculate.routes"));
const app = (0, express_1.default)();
// Initialize error monitoring
errorMonitoring_service_1.ErrorMonitoringService.getInstance();
// Group middleware by function
const setupMiddleware = (app) => {
    // Security
    app.use(requestId_1.requestId);
    (0, securityHeaders_1.setupSecurityHeaders)(app);
    app.use((0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'x-api-key',
            'x-portal-id',
        ],
        exposedHeaders: ['Content-Length', 'X-Requested-With'],
        credentials: true,
    }));
    // Performance
    app.use(performanceMiddleware_1.compressionMiddleware);
    app.use(express_1.default.json({ limit: '10kb' }));
    // Monitoring
    app.use(loggingMiddleware_1.loggingMiddleware);
    // Rate Limiting
    app.use('/api/auth', rateLimiter_2.authLimiter);
    app.use('/api', rateLimiter_1.apiLimiter);
};
setupMiddleware(app);
// Routes
app.get('/', (req, res) => {
    res.json({ message: '🚀 Hello from ValueVault Backend!' });
});
// Health Check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
    });
});
// Move Swagger docs before error handler
const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Express TypeScript API Documentation',
};
app.use('/api/items', item_routes_1.default);
app.use('/api/premises', premise_route_1.default);
app.use('/api/calculate', calculate_routes_1.default);
// Add Swagger documentation route at root level
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', swagger_ui_express_1.default.setup(swagger_1.specs, swaggerOptions));
// Error Handler should be last
const errorMiddleware = (err, req, res, next) => {
    return (0, errorHandler_1.errorHandler)(err, req, res, next);
};
app.use(errorMiddleware);
// Add this as the last middleware (before error handler)
app.use(notFound_1.notFoundHandler);
exports.default = app;
//# sourceMappingURL=app.js.map