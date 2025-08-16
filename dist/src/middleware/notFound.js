"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const apiResponse_1 = require("../utils/apiResponse");
/**
 * Middleware to handle 404 Not Found errors
 * This should be mounted after all other routes
 */
const notFoundHandler = (req, res) => {
    apiResponse_1.ApiResponse.error(res, '🔍 Ooops! Looks like you are lost. 🗺️', 404);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=notFound.js.map