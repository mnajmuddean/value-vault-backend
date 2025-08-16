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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySecretKey = verifySecretKey;
exports.asyncMiddleware = asyncMiddleware;
const auth_service_1 = require("../services/auth.service");
function verifySecretKey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientID = req.headers['x-portal-id'];
        const clientKey = req.headers['x-api-key'];
        if (clientID === undefined || clientKey === undefined) {
            return res
                .status(403)
                .json({ message: 'Forbidden - Missing API key or portal ID' });
        }
        const clientInfo = yield new auth_service_1.AuthService().getSecretByClientID(clientID);
        if (clientInfo === undefined) {
            return res.status(404).json({ message: 'Portal not found' });
        }
        if (clientInfo.secret !== clientKey) {
            return res.status(403).json({ message: 'Forbidden - Invalid API key' });
        }
        next();
    });
}
// Helper to wrap async middleware
function asyncMiddleware(handler) {
    return (req, res, next) => {
        Promise.resolve(handler(req, res, next)).catch(next);
    };
}
//# sourceMappingURL=verifySecretKey.js.map