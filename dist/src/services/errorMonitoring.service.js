"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMonitoring = exports.ErrorMonitoringService = void 0;
const appError_1 = require("../utils/appError");
const env_1 = require("../config/env");
class ErrorMonitoringService {
    constructor() {
        this.handleUncaughtException = (error) => {
            console.error("UNCAUGHT EXCEPTION! Shutting down...", {
                error: this.formatError(error),
            });
            process.exit(1);
        };
        this.handleUnhandledRejection = (reason) => {
            console.error("UNHANDLED REJECTION! Shutting down...", {
                error: this.formatError(reason instanceof Error ? reason : new Error(String(reason))),
            });
            process.exit(1);
        };
        process.on("uncaughtException", this.handleUncaughtException);
        process.on("unhandledRejection", this.handleUnhandledRejection);
    }
    static getInstance() {
        if (!ErrorMonitoringService.instance) {
            ErrorMonitoringService.instance = new ErrorMonitoringService();
        }
        return ErrorMonitoringService.instance;
    }
    logError(error, request) {
        const errorLog = this.formatError(error, request);
        if ((0, appError_1.isAppError)(error) && error.isOperational) {
            console.warn(errorLog);
        }
        else {
            console.error(errorLog);
        }
        // Here you could add integration with external error monitoring services
        // like Sentry, New Relic, etc.
    }
    formatError(error, request) {
        var _a;
        const baseError = {
            message: error.message,
            stack: env_1.ENV.NODE_ENV === "development" ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        };
        if ((0, appError_1.isAppError)(error)) {
            return Object.assign(Object.assign({}, baseError), { code: error.code, statusCode: error.statusCode, isOperational: error.isOperational, details: error.details, request: request
                    ? {
                        url: request.url,
                        method: request.method,
                        params: request.params,
                        query: request.query,
                        body: request.body,
                        userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id,
                    }
                    : undefined });
        }
        return baseError;
    }
}
exports.ErrorMonitoringService = ErrorMonitoringService;
exports.errorMonitoring = ErrorMonitoringService.getInstance();
//# sourceMappingURL=errorMonitoring.service.js.map