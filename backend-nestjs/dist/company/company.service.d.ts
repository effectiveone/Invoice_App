export declare class CompanyService {
    private companies;
    createOrUpdateCompany(companyData: any): Promise<{
        message: string;
        data: any;
    }>;
    getCompanyByUserEmail(userEmail: string): Promise<{
        message: string;
        data: any;
    }>;
}
