import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Product } from './product.entity';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getProducts(@Query() query: any) {
    return this.appService.getProducts(query);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.appService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() productData: Partial<Product>) {
    return this.appService.createProduct(productData);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: Partial<Product>) {
    return this.appService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.appService.deleteProduct(id);
  }

  // Kafka message handlers
  @MessagePattern('product.get')
  async handleGetProduct(@Payload() data: { id: string }) {
    return this.appService.getProduct(data.id);
  }

  @MessagePattern('product.create')
  async handleCreateProduct(@Payload() data: Partial<Product>) {
    return this.appService.createProduct(data);
  }

  @MessagePattern('product.update')
  async handleUpdateProduct(@Payload() data: { id: string; product: Partial<Product> }) {
    return this.appService.updateProduct(data.id, data.product);
  }

  @MessagePattern('product.delete')
  async handleDeleteProduct(@Payload() data: { id: string }) {
    return this.appService.deleteProduct(data.id);
  }

  @MessagePattern('products.list')
  async handleGetProducts(@Payload() data: any) {
    return this.appService.getProducts(data);
  }
} 