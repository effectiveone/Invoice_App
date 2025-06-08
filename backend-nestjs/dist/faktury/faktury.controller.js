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
exports.FakturyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faktury_service_1 = require("./faktury.service");
let FakturyController = class FakturyController {
    constructor(fakturyService) {
        this.fakturyService = fakturyService;
    }
    async createFaktura(fakturaData) {
        console.log('🔧 FakturyController - POST /auth/faktury:', fakturaData);
        return this.fakturyService.createFaktura(fakturaData);
    }
    async getFaktury(userData) {
        console.log('📥 FakturyController - POST /auth/get-faktury:', userData);
        const { userEmail } = userData;
        return this.fakturyService.getFakturyByUserEmail(userEmail);
    }
    async getInvoiceAllNumber(userData) {
        console.log('📥 FakturyController - POST /auth/get-invoice-all-number:', userData);
        const { userEmail } = userData;
        return this.fakturyService.getInvoiceAllNumber(userEmail);
    }
    async getFaktura(id) {
        console.log('📥 FakturyController - GET /auth/faktury/' + id);
        return this.fakturyService.getFakturaById(id);
    }
};
exports.FakturyController = FakturyController;
__decorate([
    (0, common_1.Post)('faktury'),
    (0, swagger_1.ApiOperation)({ summary: 'Tworzenie nowej faktury' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Faktura została utworzona' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FakturyController.prototype, "createFaktura", null);
__decorate([
    (0, common_1.Post)('get-faktury'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie faktur użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista faktur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FakturyController.prototype, "getFaktury", null);
__decorate([
    (0, common_1.Post)('get-invoice-all-number'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie numerów faktur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Numery faktur' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FakturyController.prototype, "getInvoiceAllNumber", null);
__decorate([
    (0, common_1.Get)('faktury/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie faktury po ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Faktura znaleziona' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FakturyController.prototype, "getFaktura", null);
exports.FakturyController = FakturyController = __decorate([
    (0, swagger_1.ApiTags)('faktury'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [faktury_service_1.FakturyService])
], FakturyController);
//# sourceMappingURL=faktury.controller.js.map