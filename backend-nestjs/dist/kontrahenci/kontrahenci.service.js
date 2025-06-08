"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KontrahenciService = void 0;
const common_1 = require("@nestjs/common");
let KontrahenciService = class KontrahenciService {
    constructor() {
        this.kontrahenci = new Map();
        this.idCounter = 1;
    }
    async createKontrahent(kontrahentData) {
        const { userEmail, ...data } = kontrahentData;
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🔧 KontrahenciService - Creating kontrahent for:', userEmail, data);
        const newKontrahent = {
            id: (this.idCounter++).toString(),
            userEmail,
            ...data,
            createdAt: new Date(),
        };
        const userKontrahenci = this.kontrahenci.get(userEmail) || [];
        userKontrahenci.push(newKontrahent);
        this.kontrahenci.set(userEmail, userKontrahenci);
        console.log('✅ KontrahenciService - Kontrahent created:', newKontrahent);
        return {
            message: 'Kontrahent został dodany',
            data: newKontrahent,
        };
    }
    async getKontrahenciByUserEmail(userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('📥 KontrahenciService - Getting kontrahenci for:', userEmail);
        const userKontrahenci = this.kontrahenci.get(userEmail) || [];
        console.log('📤 KontrahenciService - Returning kontrahenci:', userKontrahenci.length);
        return {
            message: 'Kontrahenci pobrani',
            data: userKontrahenci,
        };
    }
    async updateKontrahent(id, updateData) {
        const { userEmail, ...data } = updateData;
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🔧 KontrahenciService - Updating kontrahent:', id, data);
        const userKontrahenci = this.kontrahenci.get(userEmail) || [];
        const kontrahentIndex = userKontrahenci.findIndex((k) => k.id === id);
        if (kontrahentIndex === -1) {
            throw new Error('Kontrahent not found');
        }
        userKontrahenci[kontrahentIndex] = {
            ...userKontrahenci[kontrahentIndex],
            ...data,
        };
        this.kontrahenci.set(userEmail, userKontrahenci);
        console.log('✅ KontrahenciService - Kontrahent updated:', userKontrahenci[kontrahentIndex]);
        return {
            message: 'Kontrahent zaktualizowany',
            data: userKontrahenci[kontrahentIndex],
        };
    }
    async deleteKontrahent(id, userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🗑️ KontrahenciService - Deleting kontrahent:', id, 'for user:', userEmail);
        const userKontrahenci = this.kontrahenci.get(userEmail) || [];
        const kontrahentIndex = userKontrahenci.findIndex((k) => k.id === id);
        if (kontrahentIndex === -1) {
            throw new Error('Kontrahent not found');
        }
        const deletedKontrahent = userKontrahenci.splice(kontrahentIndex, 1)[0];
        this.kontrahenci.set(userEmail, userKontrahenci);
        console.log('✅ KontrahenciService - Kontrahent deleted:', deletedKontrahent);
        return {
            message: 'Kontrahent usunięty',
            data: deletedKontrahent,
        };
    }
};
exports.KontrahenciService = KontrahenciService;
exports.KontrahenciService = KontrahenciService = __decorate([
    (0, common_1.Injectable)()
], KontrahenciService);
//# sourceMappingURL=kontrahenci.service.js.map