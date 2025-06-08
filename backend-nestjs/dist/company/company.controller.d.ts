import { CompanyService } from './company.service';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createOrUpdateCompany(companyData: any): Promise<{
        message: string;
        data: any;
    }>;
    getCompany(body: {
        userEmail: string;
    }): Promise<{
        message: string;
        data: any;
    }>;
}
