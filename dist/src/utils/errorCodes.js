"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    // Authentication Errors (1xxx)
    ErrorCode["UNAUTHORIZED"] = "ERR_1001";
    ErrorCode["INVALID_CREDENTIALS"] = "ERR_1002";
    ErrorCode["TOKEN_EXPIRED"] = "ERR_1003";
    ErrorCode["INVALID_TOKEN"] = "ERR_1004";
    // Authorization Errors (2xxx)
    ErrorCode["FORBIDDEN"] = "ERR_2001";
    ErrorCode["INSUFFICIENT_PERMISSIONS"] = "ERR_2002";
    // Validation Errors (3xxx)
    ErrorCode["INVALID_INPUT"] = "ERR_3001";
    ErrorCode["MISSING_REQUIRED_FIELD"] = "ERR_3002";
    ErrorCode["INVALID_EMAIL"] = "ERR_3003";
    ErrorCode["INVALID_PASSWORD"] = "ERR_3004";
    ErrorCode["INVALID_REQUEST"] = "ERR_3005";
    // Resource Errors (4xxx)
    ErrorCode["NOT_FOUND"] = "ERR_4001";
    ErrorCode["ALREADY_EXISTS"] = "ERR_4002";
    ErrorCode["CONFLICT"] = "ERR_4003";
    // Database Errors (5xxx)
    ErrorCode["DB_ERROR"] = "ERR_5001";
    ErrorCode["DB_CONNECTION_ERROR"] = "ERR_5002";
    ErrorCode["DB_QUERY_ERROR"] = "ERR_5003";
    // Server Errors (6xxx)
    ErrorCode["INTERNAL_SERVER_ERROR"] = "ERR_6001";
    ErrorCode["SERVICE_UNAVAILABLE"] = "ERR_6002";
    ErrorCode["EXTERNAL_SERVICE_ERROR"] = "ERR_6003";
    // Validation Errors (3xxx)
    ErrorCode["VALIDATION_ERROR"] = "ERR_3006";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
//# sourceMappingURL=errorCodes.js.map