import { KontrahenciService } from './kontrahenci.service';
export declare class KontrahenciController {
    private readonly kontrahenciService;
    constructor(kontrahenciService: KontrahenciService);
    createKontrahent(kontrahentData: any): Promise<any>;
    getKontrahenci(userData: any): Promise<any>;
    updateKontrahent(id: string, updateData: any): Promise<any>;
    deleteKontrahent(id: string, userData: any): Promise<any>;
}
