"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_config_1 = __importDefault(require("../../../jest.config"));
const config = Object.assign(Object.assign({}, jest_config_1.default), { testMatch: ["**/__tests__/websocket/**/*.test.ts"] });
exports.default = config;
//# sourceMappingURL=jest.websocket.config.js.map