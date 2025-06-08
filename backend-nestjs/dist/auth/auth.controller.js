"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async logout() {
        return { message: 'Pomyślnie wylogowano' };
    }
    async updateSettings(settingsData) {
        console.log('🔧 AuthController - PUT /settings:', settingsData);
        return this.authService.updateUserSettings(settingsData);
    }
    async getSettings(userData) {
        console.log('📥 AuthController - POST /settings:', userData);
        const { email } = userData;
        return this.authService.getUserSettings(email);
    }
    async getInvoiceAllNumber(userData) {
        console.log('📄 AuthController - POST /invoiceAllNumber:', userData);
        const { userEmail } = userData;
        return this.authService.getInvoiceAllNumber(userEmail);
    }
    async createFaktura(fakturaData) {
        console.log('📄 AuthController - POST /faktury:', fakturaData);
        return this.authService.createFaktura(fakturaData);
    }
    async getFaktury(userData) {
        console.log('📄 AuthController - POST /get-faktury:', userData);
        const { userEmail } = userData;
        return this.authService.getFaktury(userEmail);
    }
    async editFaktura(fakturaData) {
        console.log('📄 AuthController - POST /edit-faktura:', fakturaData);
        return this.authService.editFaktura(fakturaData);
    }
    async getInvoiceStats(userData) {
        console.log('📊 AuthController - POST /stats:', userData);
        const { userEmail } = userData;
        return this.authService.getInvoiceStats(userEmail);
    }
    async getSalesStats(userData) {
        console.log('📊 AuthController - POST /salesStats:', userData);
        const { userEmail } = userData;
        return this.authService.getSalesStats(userEmail);
    }
    async getJpkData(userData) {
        console.log('📋 AuthController - POST /jpk:', userData);
        const { userEmail } = userData;
        return this.authService.getJpkData(userEmail);
    }
    async getJpkXml(userData) {
        console.log('📋 AuthController - POST /send-jpk:', userData);
        return this.authService.getJpkXml(userData);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Rejestracja użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Użytkownik został utworzony' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Użytkownik już istnieje' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Logowanie użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pomyślne logowanie' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Nieprawidłowe dane logowania' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Delete)('logout'),
    (0, swagger_1.ApiOperation)({ summary: 'Wylogowanie użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pomyślne wylogowanie' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Put)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Aktualizacja ustawień użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustawienia zaktualizowane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Post)('settings'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie ustawień użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ustawienia pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Post)('invoiceAllNumber'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie numerów faktur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Numery faktur pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getInvoiceAllNumber", null);
__decorate([
    (0, common_1.Post)('faktury'),
    (0, swagger_1.ApiOperation)({ summary: 'Tworzenie faktury' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Faktura utworzona' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createFaktura", null);
__decorate([
    (0, common_1.Post)('get-faktury'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie faktur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Faktury pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getFaktury", null);
__decorate([
    (0, common_1.Post)('edit-faktura'),
    (0, swagger_1.ApiOperation)({ summary: 'Edycja faktury' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Faktura zaktualizowana' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "editFaktura", null);
__decorate([
    (0, common_1.Post)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie statystyk faktur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statystyki pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getInvoiceStats", null);
__decorate([
    (0, common_1.Post)('salesStats'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie statystyk sprzedaży' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statystyki sprzedaży pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSalesStats", null);
__decorate([
    (0, common_1.Post)('jpk'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie danych JPK' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dane JPK pobrane' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getJpkData", null);
__decorate([
    (0, common_1.Post)('send-jpk'),
    (0, swagger_1.ApiOperation)({ summary: 'Generowanie XML JPK' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'XML JPK wygenerowany' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getJpkXml", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map