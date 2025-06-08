"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
let ProductsService = class ProductsService {
    constructor() {
        this.products = new Map();
        this.idCounter = 1;
    }
    async createProduct(productData) {
        const { userEmail, ...data } = productData;
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🔧 ProductsService - Creating product for:', userEmail, data);
        const newProduct = {
            id: (this.idCounter++).toString(),
            userEmail,
            ...data,
            createdAt: new Date(),
        };
        const userProducts = this.products.get(userEmail) || [];
        userProducts.push(newProduct);
        this.products.set(userEmail, userProducts);
        console.log('✅ ProductsService - Product created:', newProduct);
        return {
            message: 'Produkt został dodany',
            data: newProduct,
        };
    }
    async getProductsByUserEmail(userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('📥 ProductsService - Getting products for:', userEmail);
        const userProducts = this.products.get(userEmail) || [];
        console.log('📤 ProductsService - Returning products:', userProducts.length);
        return {
            message: 'Produkty pobrane',
            data: userProducts,
        };
    }
    async updateProduct(id, updateData) {
        const { userEmail, ...data } = updateData;
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🔧 ProductsService - Updating product:', id, data);
        const userProducts = this.products.get(userEmail) || [];
        const productIndex = userProducts.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }
        userProducts[productIndex] = {
            ...userProducts[productIndex],
            ...data,
        };
        this.products.set(userEmail, userProducts);
        console.log('✅ ProductsService - Product updated:', userProducts[productIndex]);
        return {
            message: 'Produkt zaktualizowany',
            data: userProducts[productIndex],
        };
    }
    async deleteProduct(id, userEmail) {
        if (!userEmail) {
            throw new Error('UserEmail is required');
        }
        console.log('🗑️ ProductsService - Deleting product:', id, 'for user:', userEmail);
        const userProducts = this.products.get(userEmail) || [];
        const productIndex = userProducts.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }
        const deletedProduct = userProducts.splice(productIndex, 1)[0];
        this.products.set(userEmail, userProducts);
        console.log('✅ ProductsService - Product deleted:', deletedProduct);
        return {
            message: 'Produkt usunięty',
            data: deletedProduct,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
//# sourceMappingURL=products.service.js.map