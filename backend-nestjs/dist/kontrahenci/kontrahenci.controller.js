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
exports.KontrahenciController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const kontrahenci_service_1 = require("./kontrahenci.service");
let KontrahenciController = class KontrahenciController {
    constructor(kontrahenciService) {
        this.kontrahenciService = kontrahenciService;
    }
    async createKontrahent(kontrahentData) {
        console.log('🔧 KontrahenciController - POST /kontrahenci:', kontrahentData);
        return this.kontrahenciService.createKontrahent(kontrahentData);
    }
    async getKontrahenci(userData) {
        console.log('📥 KontrahenciController - POST /kontrahenci/read:', userData);
        const { userEmail } = userData;
        return this.kontrahenciService.getKontrahenciByUserEmail(userEmail);
    }
    async updateKontrahent(id, updateData) {
        console.log('🔧 KontrahenciController - PUT /kontrahenci/' + id, updateData);
        return this.kontrahenciService.updateKontrahent(id, updateData);
    }
    async deleteKontrahent(id, userData) {
        console.log('🗑️ KontrahenciController - DELETE /kontrahenci/' + id, userData);
        const { userEmail } = userData;
        return this.kontrahenciService.deleteKontrahent(id, userEmail);
    }
};
exports.KontrahenciController = KontrahenciController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Dodawanie nowego kontrahenta' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kontrahent został dodany' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KontrahenciController.prototype, "createKontrahent", null);
__decorate([
    (0, common_1.Post)('read'),
    (0, swagger_1.ApiOperation)({ summary: 'Pobieranie kontrahentów użytkownika' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista kontrahentów' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KontrahenciController.prototype, "getKontrahenci", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Aktualizacja kontrahenta' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kontrahent zaktualizowany' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KontrahenciController.prototype, "updateKontrahent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Usuwanie kontrahenta' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kontrahent usunięty' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KontrahenciController.prototype, "deleteKontrahent", null);
exports.KontrahenciController = KontrahenciController = __decorate([
    (0, swagger_1.ApiTags)('kontrahenci'),
    (0, common_1.Controller)('kontrahenci'),
    __metadata("design:paramtypes", [kontrahenci_service_1.KontrahenciService])
], KontrahenciController);
//# sourceMappingURL=kontrahenci.controller.js.map