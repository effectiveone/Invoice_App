"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
let CompanyService = class CompanyService {
    constructor() {
        this.companies = new Map();
    }
    async createOrUpdateCompany(companyData) {
        const { userEmail, ...data } = companyData;
        if (!userEmail) {
            throw new Error('User email is required');
        }
        this.companies.set(userEmail, {
            ...data,
            userEmail,
            updatedAt: new Date(),
        });
        console.log('📊 Company Service - Saved company data for:', userEmail);
        return {
            message: 'Company data saved successfully',
            data: this.companies.get(userEmail),
        };
    }
    async getCompanyByUserEmail(userEmail) {
        if (!userEmail) {
            throw new Error('User email is required');
        }
        const companyData = this.companies.get(userEmail);
        if (!companyData) {
            return {
                message: 'No company data found',
                data: {
                    userEmail,
                    companyName: '',
                    legalForm: '',
                    nip: '',
                    regon: '',
                    street: '',
                    city: '',
                    zipCode: '',
                    bankName: '',
                    bankAccount: '',
                },
            };
        }
        console.log('📊 Company Service - Retrieved company data for:', userEmail);
        return {
            message: 'Company data retrieved successfully',
            data: companyData,
        };
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)()
], CompanyService);
//# sourceMappingURL=company.service.js.map