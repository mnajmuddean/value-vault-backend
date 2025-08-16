"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const errorHandler_1 = require("../utils/errorHandler");
const validateRequest = (schema) => {
    return (req, res, next) => {
        var _a;
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
                headers: req.headers
            });
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                next(new errorHandler_1.ValidationError(((_a = error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || "Validation failed"));
                return;
            }
            next(new errorHandler_1.ValidationError("Invalid request data"));
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validateRequest.js.map