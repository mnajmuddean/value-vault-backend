"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const env_1 = require("../config/env");
const cache = (options = {}) => {
    const duration = options.duration || 300; // 5 minutes default
    return (req, res, next) => {
        if (env_1.ENV.NODE_ENV === "production" && req.method === "GET") {
            res.set("Cache-Control", `${options.private ? "private" : "public"}, max-age=${duration}`);
        }
        else {
            res.set("Cache-Control", "no-store");
        }
        next();
    };
};
exports.cache = cache;
//# sourceMappingURL=cacheMiddleware.js.map