import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(query: any = {}): Promise<Product[]> {
    const { category, isActive = true, search } = query;
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (category) {
      queryBuilder.andWhere('product.category = :category', { category });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('product.isActive = :isActive', { isActive });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.description ILIKE :search OR product.sku ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    return queryBuilder.getMany();
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.getProduct(id);
  }

  async deleteProduct(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.productRepository.delete(id);
    return {
      deleted: result.affected > 0,
      id,
    };
  }

  getHello(): string {
    return 'Product Service is running!';
  }
} 