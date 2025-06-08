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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.users = [];
        this.userSettings = new Map();
        this.initializeDefaultUser();
    }
    async initializeDefaultUser() {
        const defaultUser = {
            id: '1',
            mail: 'demo@invoiceapp.com',
            username: 'demo',
            password: await bcrypt.hash('demo123', 12),
            createdAt: new Date(),
        };
        this.users.push(defaultUser);
        this.userSettings.set('demo@invoiceapp.com', {
            email: 'demo@invoiceapp.com',
            lang: 'pl',
            designName: 'Material Palenight',
            templateInvoice: 'basicInput',
            theme: 'light',
        });
        console.log('✅ AuthService - Utworzono domyślnego użytkownika: demo@invoiceapp.com / demo123');
    }
    async register(registerDto) {
        const { mail, username, password } = registerDto;
        const existingUser = this.users.find((user) => user.mail === mail);
        if (existingUser) {
            throw new common_1.ConflictException('Użytkownik z tym emailem już istnieje');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {
            id: Date.now().toString(),
            mail,
            username,
            password: hashedPassword,
            createdAt: new Date(),
        };
        this.users.push(user);
        this.userSettings.set(mail, {
            email: mail,
            lang: 'en',
            designName: 'Material Palenight',
            templateInvoice: 'basicInput',
            theme: 'light',
        });
        const payload = { userId: user.id, mail: user.mail };
        const token = this.jwtService.sign(payload);
        return {
            message: 'Użytkownik został utworzony pomyślnie',
            userDetails: {
                id: user.id,
                mail: user.mail,
                username: user.username,
                token,
            },
        };
    }
    async login(loginDto) {
        const { mail, password } = loginDto;
        const user = this.users.find((u) => u.mail === mail);
        if (!user) {
            throw new common_1.UnauthorizedException('Nieprawidłowe dane logowania');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Nieprawidłowe dane logowania');
        }
        if (!this.userSettings.has(mail)) {
            this.userSettings.set(mail, {
                email: mail,
                lang: 'en',
                designName: 'Material Palenight',
                templateInvoice: 'basicInput',
                theme: 'light',
            });
        }
        const payload = { userId: user.id, mail: user.mail };
        const token = this.jwtService.sign(payload);
        return {
            userDetails: {
                id: user.id,
                mail: user.mail,
                username: user.username,
                token,
            },
        };
    }
    async validateUser(userId) {
        const user = this.users.find((u) => u.id === userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Użytkownik nie znaleziony');
        }
        return {
            id: user.id,
            mail: user.mail,
            username: user.username,
        };
    }
    async updateUserSettings(settingsData) {
        const { email, ...settings } = settingsData;
        if (!email) {
            throw new Error('Email is required');
        }
        console.log('🔧 AuthService - Updating settings for:', email, settings);
        const existingSettings = this.userSettings.get(email) || {
            email,
            lang: 'en',
            designName: 'Material Palenight',
            templateInvoice: 'basicInput',
            theme: 'light',
        };
        const updatedSettings = {
            ...existingSettings,
            ...settings,
            email,
        };
        this.userSettings.set(email, updatedSettings);
        console.log('✅ AuthService - Settings updated:', updatedSettings);
        return {
            message: 'Ustawienia zaktualizowane',
            settings: updatedSettings,
        };
    }
    async getUserSettings(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        console.log('📥 AuthService - Getting settings for:', email);
        const settings = this.userSettings.get(email) || {
            email,
            lang: 'en',
            designName: 'Material Palenight',
            templateInvoice: 'basicInput',
            theme: 'light',
        };
        console.log('📤 AuthService - Returning settings:', settings);
        return settings;
    }
    async getInvoiceAllNumber(userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('📄 AuthService - Getting invoice numbers for:', userEmail);
        const invoiceNumbers = {
            sprzedazowa: 'FV/001/2025',
            zakupowa: 'FZ/001/2025',
            koregujaca: 'FK/001/2025',
            zaliczkowa: 'FZA/001/2025',
            proformaSprzedazowa: 'PF/001/2025',
            proformaZakupowa: 'PZ/001/2025',
        };
        console.log('📤 AuthService - Returning invoice numbers:', invoiceNumbers);
        return invoiceNumbers;
    }
    async createFaktura(fakturaData) {
        console.log('📄 AuthService - Creating faktura:', fakturaData);
        const faktura = {
            id: Date.now().toString(),
            ...fakturaData,
            createdAt: new Date(),
        };
        return {
            message: 'Faktura utworzona',
            data: faktura,
        };
    }
    async getFaktury(userEmail) {
        console.log('📄 AuthService - Getting faktury for:', userEmail);
        const faktury = [
            {
                id: '1',
                invoiceNumber: 'FV/001/2025',
                userEmail,
                totalNetValue: 1000,
                totalGrossValue: 1230,
                createdAt: new Date(),
            },
        ];
        return {
            message: 'Faktury pobrane',
            data: faktury,
        };
    }
    async editFaktura(fakturaData) {
        console.log('📄 AuthService - Editing faktura:', fakturaData);
        const updatedFaktura = {
            ...fakturaData,
            updatedAt: new Date(),
        };
        return {
            message: 'Faktura zaktualizowana',
            data: updatedFaktura,
        };
    }
    async getInvoiceStats(userEmail) {
        console.log('📊 AuthService - Getting invoice stats for:', userEmail);
        const stats = {
            totalInvoices: 10,
            totalNetValue: 10000,
            totalGrossValue: 12300,
            monthlyStats: {
                '2025-01': { count: 5, netValue: 5000, grossValue: 6150 },
                '2025-02': { count: 5, netValue: 5000, grossValue: 6150 },
            },
        };
        return {
            message: 'Statystyki pobrane',
            data: stats,
        };
    }
    async getSalesStats(userEmail) {
        console.log('📊 AuthService - Getting sales stats for:', userEmail);
        const salesStats = {
            totalSales: 15000,
            monthlySales: {
                '2025-01': 7500,
                '2025-02': 7500,
            },
            topProducts: [
                { name: 'Product 1', sales: 5000 },
                { name: 'Product 2', sales: 3000 },
            ],
        };
        return {
            message: 'Statystyki sprzedaży pobrane',
            data: salesStats,
        };
    }
    async getJpkData(userEmail) {
        console.log('📋 AuthService - Getting JPK data for:', userEmail);
        const jpkData = {
            jpk: {
                allInvoices: [
                    {
                        id: '1',
                        invoiceNumber: 'FV/001/2025',
                        netValue: 1000,
                        grossValue: 1230,
                        vatValue: 230,
                    },
                ],
            },
        };
        return {
            message: 'Dane JPK pobrane',
            data: jpkData,
        };
    }
    async getJpkXml(userData) {
        console.log('📋 AuthService - Generating JPK XML:', userData);
        const jpkXml = `<?xml version="1.0" encoding="UTF-8"?>
<JPK xmlns="http://jpk.mf.gov.pl/wzor/2016/03/09/03134/">
  <Naglowek>
    <KodFormularza kodSystemowy="JPK_VAT (3)" wersjaSchemy="1-1">JPK_VAT</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <CelZlozenia poz="P_7">1</CelZlozenia>
    <DataWytworzeniaJPK>2025-06-01T07:00:00</DataWytworzeniaJPK>
  </Naglowek>
</JPK>`;
        return {
            message: 'XML JPK wygenerowany',
            data: jpkXml,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map