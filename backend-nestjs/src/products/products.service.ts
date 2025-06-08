import { Injectable } from '@nestjs/common';

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

@Injectable()
export class ProductsService {
  private products: Map<string, Product[]> = new Map(); // Grupowane po userEmail
  private idCounter = 1;

  async createProduct(productData: any) {
    const { userEmail, ...data } = productData;

    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('🔧 ProductsService - Creating product for:', userEmail, data);

    const newProduct: Product = {
      id: (this.idCounter++).toString(),
      userEmail,
      ...data,
      createdAt: new Date(),
    };

    // Pobierz istniejące produkty użytkownika lub utwórz pustą tablicę
    const userProducts = this.products.get(userEmail) || [];
    userProducts.push(newProduct);
    this.products.set(userEmail, userProducts);

    console.log('✅ ProductsService - Product created:', newProduct);

    return {
      message: 'Produkt został dodany',
      data: newProduct,
    };
  }

  async getProductsByUserEmail(userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('📥 ProductsService - Getting products for:', userEmail);

    const userProducts = this.products.get(userEmail) || [];

    console.log(
      '📤 ProductsService - Returning products:',
      userProducts.length,
    );

    return {
      message: 'Produkty pobrane',
      data: userProducts,
    };
  }

  async updateProduct(id: string, updateData: any) {
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

    // Aktualizuj produkt
    userProducts[productIndex] = {
      ...userProducts[productIndex],
      ...data,
    };

    this.products.set(userEmail, userProducts);

    console.log(
      '✅ ProductsService - Product updated:',
      userProducts[productIndex],
    );

    return {
      message: 'Produkt zaktualizowany',
      data: userProducts[productIndex],
    };
  }

  async deleteProduct(id: string, userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log(
      '🗑️ ProductsService - Deleting product:',
      id,
      'for user:',
      userEmail,
    );

    const userProducts = this.products.get(userEmail) || [];
    const productIndex = userProducts.findIndex((p) => p.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Usuń produkt
    const deletedProduct = userProducts.splice(productIndex, 1)[0];
    this.products.set(userEmail, userProducts);

    console.log('✅ ProductsService - Product deleted:', deletedProduct);

    return {
      message: 'Produkt usunięty',
      data: deletedProduct,
    };
  }
}
