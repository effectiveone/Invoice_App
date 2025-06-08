interface Kontrahent {
    id: string;
    userEmail: string;
    name: string;
    nip?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    email?: string;
    phone?: string;
    createdAt: Date;
    [key: string]: any;
}
export declare class KontrahenciService {
    private kontrahenci;
    private idCounter;
    createKontrahent(kontrahentData: any): Promise<{
        message: string;
        data: Kontrahent;
    }>;
    getKontrahenciByUserEmail(userEmail: string): Promise<{
        message: string;
        data: Kontrahent[];
    }>;
    updateKontrahent(id: string, updateData: any): Promise<{
        message: string;
        data: Kontrahent;
    }>;
    deleteKontrahent(id: string, userEmail: string): Promise<{
        message: string;
        data: Kontrahent;
    }>;
}
export {};
