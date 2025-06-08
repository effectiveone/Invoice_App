"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakturyService = void 0;
const common_1 = require("@nestjs/common");
let FakturyService = class FakturyService {
    constructor() {
        this.faktury = new Map();
        this.idCounter = 1;
        this.invoiceCounters = new Map();
    }
    async createFaktura(fakturaData) {
        const { userEmail, ...data } = fakturaData;
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🔧 FakturyService - Creating faktura for:', userEmail, data);
        const invoiceNumber = this.generateInvoiceNumber(userEmail, data.invoiceType || 'sprzedazowa');
        const newFaktura = {
            id: (this.idCounter++).toString(),
            userEmail,
            invoiceNumber,
            ...data,
            createdAt: new Date(),
        };
        const userFaktury = this.faktury.get(userEmail) || [];
        userFaktury.push(newFaktura);
        this.faktury.set(userEmail, userFaktury);
        console.log('✅ FakturyService - Faktura created:', newFaktura);
        return {
            message: 'Faktura została dodana',
            data: newFaktura,
        };
    }
    async getFakturyByUserEmail(userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('📥 FakturyService - Getting faktury for:', userEmail);
        const userFaktury = this.faktury.get(userEmail) || [];
        console.log('📤 FakturyService - Returning faktury:', userFaktury.length);
        return {
            message: 'Faktury pobrane',
            data: userFaktury,
        };
    }
    async getFakturaById(id) {
        console.log('📥 FakturyService - Getting faktura by ID:', id);
        for (const userFaktury of this.faktury.values()) {
            const faktura = userFaktury.find((f) => f.id === id);
            if (faktura) {
                return {
                    message: 'Faktura znaleziona',
                    data: faktura,
                };
            }
        }
        throw new Error('Faktura not found');
    }
    async getInvoiceAllNumber(userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('📥 FakturyService - Getting invoice numbers for:', userEmail);
        let userCounters = this.invoiceCounters.get(userEmail);
        if (!userCounters) {
            userCounters = {
                sprzedazowa: 'FV/2024/001',
                zakupowa: 'FZ/2024/001',
                koregujaca: 'FK/2024/001',
                zaliczkowa: 'FZA/2024/001',
                proformaSprzedazowa: 'PF/2024/001',
                proformaZakupowa: 'PZ/2024/001',
            };
            this.invoiceCounters.set(userEmail, userCounters);
        }
        return {
            message: 'Numery faktur pobrane',
            data: userCounters,
        };
    }
    generateInvoiceNumber(userEmail, invoiceType) {
        let userCounters = this.invoiceCounters.get(userEmail);
        if (!userCounters) {
            userCounters = {
                sprzedazowa: 'FV/2024/001',
                zakupowa: 'FZ/2024/001',
                koregujaca: 'FK/2024/001',
                zaliczkowa: 'FZA/2024/001',
                proformaSprzedazowa: 'PF/2024/001',
                proformaZakupowa: 'PZ/2024/001',
            };
            this.invoiceCounters.set(userEmail, userCounters);
        }
        const currentNumber = userCounters[invoiceType] || 'FV/2024/001';
        const parts = currentNumber.split('/');
        const number = parseInt(parts[2]) + 1;
        const newNumber = `${parts[0]}/${parts[1]}/${number.toString().padStart(3, '0')}`;
        userCounters[invoiceType] = newNumber;
        this.invoiceCounters.set(userEmail, userCounters);
        return currentNumber;
    }
};
exports.FakturyService = FakturyService;
exports.FakturyService = FakturyService = __decorate([
    (0, common_1.Injectable)()
], FakturyService);
//# sourceMappingURL=faktury.service.js.map