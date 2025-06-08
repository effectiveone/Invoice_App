import { FakturyService } from './faktury.service';
export declare class FakturyController {
    private readonly fakturyService;
    constructor(fakturyService: FakturyService);
    createFaktura(fakturaData: any): Promise<any>;
    getFaktury(userData: any): Promise<any>;
    getInvoiceAllNumber(userData: any): Promise<any>;
    getFaktura(id: string): Promise<any>;
}
