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
const ws_1 = __importDefault(require("ws"));
const app_1 = __importDefault(require("../../app"));
const http_1 = require("http");
const websocket_service_1 = require("@/services/websocket.service");
const TEST_PORT = 4400;
describe('WebSocket Tests', () => {
    jest.setTimeout(10000);
    let ws;
    let server = (0, http_1.createServer)(app_1.default);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            server.listen(TEST_PORT, () => {
                websocket_service_1.WebSocketService.getInstance(server);
                resolve();
            });
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve) => {
            ws === null || ws === void 0 ? void 0 : ws.close();
            websocket_service_1.WebSocketService.instance = null;
            server.close(() => resolve());
        });
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            ws = new ws_1.default(`ws://localhost:${TEST_PORT}`);
            ws.on('open', () => resolve());
            ws.on('error', reject);
        });
    }));
    afterEach(() => {
        if ((ws === null || ws === void 0 ? void 0 : ws.readyState) === ws_1.default.OPEN) {
            ws.close();
        }
    });
    it('should receive connection confirmation', (done) => {
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            expect(message.type).toBe('connection');
            expect(message.data).toHaveProperty('clientId');
            done();
        });
    });
    it('should handle ping-pong', (done) => {
        ws.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === 'pong') {
                expect(message.data).toHaveProperty('timestamp');
                done();
            }
        });
        ws.send(JSON.stringify({ type: 'ping' }));
    });
});
//# sourceMappingURL=websocket.test.js.map