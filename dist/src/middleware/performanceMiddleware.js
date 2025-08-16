"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressionMiddleware = void 0;
const compression_1 = __importDefault(require("compression"));
// Skip compressing responses for small payloads
const shouldCompress = (req, res) => {
    if (req.headers["x-no-compression"]) {
        return false;
    }
    return compression_1.default.filter(req, res);
};
exports.compressionMiddleware = (0, compression_1.default)({
    filter: shouldCompress,
    level: 6, // Default compression level
    threshold: 1024, // Only compress responses above 1KB
});
//# sourceMappingURL=performanceMiddleware.js.map