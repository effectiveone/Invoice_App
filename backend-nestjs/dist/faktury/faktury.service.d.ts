interface Faktura {
    id: string;
    userEmail: string;
    invoiceNumber: string;
    invoiceType: string;
    invoiceDate: string;
    invoiceSaleDate: string;
    invoicePaymentDate: string;
    selectedKontrahent: any;
    items: any[];
    totalNetValue: number;
    totalGrossValue: number;
    notes: string;
    createdAt: Date;
    [key: string]: any;
}
export declare class FakturyService {
    private faktury;
    private idCounter;
    private invoiceCounters;
    createFaktura(fakturaData: any): Promise<{
        message: string;
        data: Faktura;
    }>;
    getFakturyByUserEmail(userEmail: string): Promise<{
        message: string;
        data: Faktura[];
    }>;
    getFakturaById(id: string): Promise<{
        message: string;
        data: Faktura;
    }>;
    getInvoiceAllNumber(userEmail: string): Promise<{
        message: string;
        data: any;
    }>;
    private generateInvoiceNumber;
}
export {};
