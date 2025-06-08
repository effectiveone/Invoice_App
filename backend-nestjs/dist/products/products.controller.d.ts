import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(productData: any): Promise<any>;
    getProducts(userData: any): Promise<any>;
    updateProduct(id: string, updateData: any): Promise<any>;
    deleteProduct(id: string, userData: any): Promise<any>;
}
