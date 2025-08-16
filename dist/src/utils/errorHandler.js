"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.ValidationError = exports.ErrorHandler = void 0;
const appError_1 = require("./appError");
const errorCodes_1 = require("./errorCodes");
class ErrorHandler {
    static handle(error, context) {
        // Handle Prisma errors
        // if (error instanceof Prisma.PrismaClientKnownRequestError) {
        //   const prismaError = this.handlePrismaError(error);
        //   console.warn("Prisma error occurred", {
        //     message: prismaError.message,
        //     context,
        //     code: prismaError.code,
        //     statusCode: prismaError.statusCode,
        //     prismaCode: error.code,
        //     meta: error.meta, // Include Prisma metadata
        //   });
        //   return prismaError;
        // }
        if (error instanceof appError_1.AppError) {
            console.warn("Application error occurred", {
                message: error.message,
                context,
                code: error.code,
                statusCode: error.statusCode,
                details: error.details,
                stack: error.stack,
            });
            return error;
        }
        // Log unknown errors
        const unknownError = new appError_1.AppError("Internal server error", 500, errorCodes_1.ErrorCode.INTERNAL_SERVER_ERROR, false);
        console.warn("Unknown error occurred", {
            message: error instanceof Error ? error.message : "Unknown error",
            context,
            error: error instanceof Error ? error.stack : JSON.stringify(error),
            details: error instanceof Error ? error : undefined,
        });
        return unknownError;
    }
}
exports.ErrorHandler = ErrorHandler;
// Add more specific error types
class ValidationError extends appError_1.AppError {
    constructor(message) {
        super(message, 400, errorCodes_1.ErrorCode.VALIDATION_ERROR);
    }
}
exports.ValidationError = ValidationError;
class DatabaseError extends appError_1.AppError {
    constructor(message) {
        super(message, 500, errorCodes_1.ErrorCode.DB_ERROR);
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=errorHandler.js.map