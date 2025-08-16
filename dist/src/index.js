"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const server = app_1.default.listen(env_1.ENV.PORT, () => {
    console.log(`Server running on port ${env_1.ENV.PORT} in ${env_1.ENV.NODE_ENV} mode`);
});
// Graceful shutdown handler
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Shutdown signal received");
    // Add connection draining
    app_1.default.disable("connection"); // Stop accepting new connections
    server.close(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("HTTP server closed");
        try {
            console.log("Database connections closed");
            process.exit(0);
        }
        catch (err) {
            console.log("Error during shutdown:", err);
            process.exit(1);
        }
    }));
    // Force shutdown after 30 seconds
    setTimeout(() => {
        console.log("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 30000);
});
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
exports.default = server;
//# sourceMappingURL=index.js.map