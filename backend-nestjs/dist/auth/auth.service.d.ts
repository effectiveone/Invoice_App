import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
interface UserSettings {
    email: string;
    lang?: string;
    designName?: string;
    templateInvoice?: string;
    theme?: string;
    [key: string]: any;
}
export declare class AuthService {
    private jwtService;
    private users;
    private userSettings;
    constructor(jwtService: JwtService);
    private initializeDefaultUser;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userDetails: {
            id: string;
            mail: string;
            username: string;
            token: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        userDetails: {
            id: string;
            mail: string;
            username: string;
            token: string;
        };
    }>;
    validateUser(userId: string): Promise<{
        id: string;
        mail: string;
        username: string;
    }>;
    updateUserSettings(settingsData: any): Promise<{
        message: string;
        settings: any;
    }>;
    getUserSettings(email: string): Promise<UserSettings>;
    getInvoiceAllNumber(userEmail: string): Promise<{
        sprzedazowa: string;
        zakupowa: string;
        koregujaca: string;
        zaliczkowa: string;
        proformaSprzedazowa: string;
        proformaZakupowa: string;
    }>;
    createFaktura(fakturaData: any): Promise<{
        message: string;
        data: any;
    }>;
    getFaktury(userEmail: string): Promise<{
        message: string;
        data: {
            id: string;
            invoiceNumber: string;
            userEmail: string;
            totalNetValue: number;
            totalGrossValue: number;
            createdAt: Date;
        }[];
    }>;
    editFaktura(fakturaData: any): Promise<{
        message: string;
        data: any;
    }>;
    getInvoiceStats(userEmail: string): Promise<{
        message: string;
        data: {
            totalInvoices: number;
            totalNetValue: number;
            totalGrossValue: number;
            monthlyStats: {
                '2025-01': {
                    count: number;
                    netValue: number;
                    grossValue: number;
                };
                '2025-02': {
                    count: number;
                    netValue: number;
                    grossValue: number;
                };
            };
        };
    }>;
    getSalesStats(userEmail: string): Promise<{
        message: string;
        data: {
            totalSales: number;
            monthlySales: {
                '2025-01': number;
                '2025-02': number;
            };
            topProducts: {
                name: string;
                sales: number;
            }[];
        };
    }>;
    getJpkData(userEmail: string): Promise<{
        message: string;
        data: {
            jpk: {
                allInvoices: {
                    id: string;
                    invoiceNumber: string;
                    netValue: number;
                    grossValue: number;
                    vatValue: number;
                }[];
            };
        };
    }>;
    getJpkXml(userData: any): Promise<{
        message: string;
        data: string;
    }>;
}
export {};
