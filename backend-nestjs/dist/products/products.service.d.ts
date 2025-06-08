interface Product {
    id: string;
    userEmail: string;
    name: string;
    description?: string;
    price: number;
    unit?: string;
    vatRate?: number;
    category?: string;
    createdAt: Date;
    [key: string]: any;
}
export declare class ProductsService {
    private products;
    private idCounter;
    createProduct(productData: any): Promise<{
        message: string;
        data: Product;
    }>;
    getProductsByUserEmail(userEmail: string): Promise<{
        message: string;
        data: Product[];
    }>;
    updateProduct(id: string, updateData: any): Promise<{
        message: string;
        data: Product;
    }>;
    deleteProduct(id: string, userEmail: string): Promise<{
        message: string;
        data: Product;
    }>;
}
export {};
