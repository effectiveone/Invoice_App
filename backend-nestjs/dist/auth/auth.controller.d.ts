import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(): Promise<{
        message: string;
    }>;
    updateSettings(settingsData: any): Promise<{
        message: string;
        settings: any;
    }>;
    getSettings(userData: any): Promise<any>;
    getInvoiceAllNumber(userData: any): Promise<any>;
    createFaktura(fakturaData: any): Promise<any>;
    getFaktury(userData: any): Promise<any>;
    editFaktura(fakturaData: any): Promise<any>;
    getInvoiceStats(userData: any): Promise<any>;
    getSalesStats(userData: any): Promise<any>;
    getJpkData(userData: any): Promise<any>;
    getJpkXml(userData: any): Promise<any>;
}
