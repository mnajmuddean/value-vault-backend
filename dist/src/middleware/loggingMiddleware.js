"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const loggingMiddleware = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        var _a;
        const logData = {
            requestId: req.requestId,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${Date.now() - startTime}ms`,
            userAgent: req.get("user-agent"),
            ip: req.ip,
            context: "HttpRequest",
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            query: Object.keys(req.query).length ? req.query : undefined,
            body: Object.keys(req.body || {}).length ? req.body : undefined,
        };
        if (res.statusCode >= 400) {
            console.error("Request failed", logData);
        }
        else {
            console.info("Request completed", logData);
        }
    });
    next();
};
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=loggingMiddleware.js.map