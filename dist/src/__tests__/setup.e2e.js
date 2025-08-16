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
exports.prisma = exports.testApp = void 0;
const client_1 = require("@prisma/client");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$connect();
    // Clean database at start
    yield prisma.$transaction([prisma.user.deleteMany()]);
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Clean database before each test
    yield prisma.$transaction([prisma.user.deleteMany()]);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$transaction([prisma.user.deleteMany()]);
    yield prisma.$disconnect();
}));
exports.testApp = (0, supertest_1.default)(app_1.default);
//# sourceMappingURL=setup.e2e.js.map