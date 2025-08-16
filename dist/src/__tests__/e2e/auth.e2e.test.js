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
const setup_e2e_1 = require("../setup.e2e");
const database_1 = __importDefault(require("../../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe("Auth endpoints", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean database before each test
        yield database_1.default.$transaction([database_1.default.user.deleteMany()]);
    }));
    describe("POST /api/auth/signup", () => {
        it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield setup_e2e_1.testApp.post("/api/auth/signup").send({
                email: "test@example.com",
                name: "Test User",
                password: "Password123!",
            });
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("id");
        }));
    });
    describe("POST /api/auth/login", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash("Password123!", 10);
            // Create test user with all required fields
            yield database_1.default.user.create({
                data: {
                    email: "test@example.com",
                    name: "Test User",
                    password: hashedPassword,
                    role: "USER",
                    emailVerified: null,
                    image: null,
                    refreshToken: null,
                },
            });
            // Wait a bit to ensure user is created
            yield new Promise((resolve) => setTimeout(resolve, 100));
        }));
        it("should login successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield setup_e2e_1.testApp.post("/api/auth/login").send({
                email: "test@example.com",
                password: "Password123!",
            });
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("accessToken");
        }));
    });
    describe("Email verification", () => {
        it("should verify email with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
            // Create user with verification token
            const user = yield database_1.default.user.create({
                data: {
                    email: "test@example.com",
                    name: "Test User",
                    password: yield bcrypt_1.default.hash("Password123!", 10),
                    emailVerificationToken: "test-token",
                    emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                },
            });
            const response = yield setup_e2e_1.testApp
                .get("/api/auth/verify-email/test-token")
                .expect(200);
            expect(response.body.success).toBe(true);
            // Check user is verified
            const verifiedUser = yield database_1.default.user.findUnique({
                where: { id: user.id }
            });
            expect(verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.emailVerified).toBeTruthy();
        }));
    });
    describe("Password Reset", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.user.deleteMany();
        }));
        it("should send password reset email", () => __awaiter(void 0, void 0, void 0, function* () {
            // Create a user first
            const user = yield database_1.default.user.create({
                data: {
                    email: "test@example.com",
                    name: "Test User",
                    password: yield bcrypt_1.default.hash("Password123!", 10),
                    emailVerified: new Date(),
                },
            });
            const response = yield setup_e2e_1.testApp
                .post("/api/auth/forgot-password")
                .send({ email: "test@example.com" })
                .expect(200);
            expect(response.body.success).toBe(true);
            // Verify token was created
            const updatedUser = yield database_1.default.user.findUnique({
                where: { id: user.id },
            });
            expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.passwordResetToken).toBeTruthy();
            expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.passwordResetExpires).toBeTruthy();
        }));
        it("should reset password with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
            // Create user with reset token
            const resetToken = "test-reset-token";
            const user = yield database_1.default.user.create({
                data: {
                    email: "test@example.com",
                    name: "Test User",
                    password: yield bcrypt_1.default.hash("OldPassword123!", 10),
                    passwordResetToken: resetToken,
                    passwordResetExpires: new Date(Date.now() + 3600000), // 1 hour
                    emailVerified: new Date(),
                },
            });
            const response = yield setup_e2e_1.testApp
                .post(`/api/auth/reset-password/${resetToken}`)
                .send({ password: "NewPassword123!" })
                .expect(200);
            expect(response.body.success).toBe(true);
            // Verify password was changed
            const updatedUser = yield database_1.default.user.findUnique({
                where: { id: user.id },
            });
            expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.passwordResetToken).toBeNull();
            expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.passwordResetExpires).toBeNull();
            // Verify can login with new password
            const loginResponse = yield setup_e2e_1.testApp
                .post("/api/auth/login")
                .send({
                email: "test@example.com",
                password: "NewPassword123!",
            })
                .expect(200);
            expect(loginResponse.body.data.accessToken).toBeTruthy();
        }));
        it("should not reset password with expired token", () => __awaiter(void 0, void 0, void 0, function* () {
            // Create user with expired reset token
            yield database_1.default.user.create({
                data: {
                    email: "test@example.com",
                    name: "Test User",
                    password: yield bcrypt_1.default.hash("Password123!", 10),
                    passwordResetToken: "expired-token",
                    passwordResetExpires: new Date(Date.now() - 3600000), // 1 hour ago
                    emailVerified: new Date(),
                },
            });
            const response = yield setup_e2e_1.testApp
                .post("/api/auth/reset-password/expired-token")
                .send({ password: "NewPassword123!" })
                .expect(400);
            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe("ERR_1004"); // INVALID_TOKEN
        }));
    });
});
//# sourceMappingURL=auth.e2e.test.js.map