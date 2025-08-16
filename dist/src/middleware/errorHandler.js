"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../utils/appError");
const apiResponse_1 = require("../utils/apiResponse");
const errorHandler = (error, req, res, _next) => {
    console.error({
        message: error.message,
        stack: error.stack,
        context: "ErrorHandler",
    });
    if (error instanceof appError_1.AppError) {
        apiResponse_1.ApiResponse.error(res, error.message, error.statusCode);
        return;
    }
    apiResponse_1.ApiResponse.error(res, "Internal server error", 500);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map