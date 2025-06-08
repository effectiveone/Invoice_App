import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('products')
export class ProductGatewayController {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientKafka) {}

  @Post()
  async createProduct(@Body() productData: any) {
    try {
      const result = await this.productClient
        .send('product.create', productData)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const result = await this.productClient
        .send('product.get', { id })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('user/:userId')
  async listProducts(@Param('userId') userId: string) {
    try {
      const result = await this.productClient
        .send('product.list', { userId })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() updateData: any) {
    try {
      const result = await this.productClient
        .send('product.update', { id, updateData })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const result = await this.productClient
        .send('product.delete', { id })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('search/:query')
  async searchProducts(@Param('query') query: string) {
    try {
      const result = await this.productClient
        .send('product.search', { query })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
