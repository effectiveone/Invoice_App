import { Controller, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Dodawanie nowego produktu' })
  @ApiResponse({ status: 201, description: 'Produkt został dodany' })
  async createProduct(@Body() productData: any): Promise<any> {
    console.log('🔧 ProductsController - POST /products:', productData);
    return this.productsService.createProduct(productData);
  }

  @Post('read')
  @ApiOperation({ summary: 'Pobieranie produktów użytkownika' })
  @ApiResponse({ status: 200, description: 'Lista produktów' })
  async getProducts(@Body() userData: any): Promise<any> {
    console.log('📥 ProductsController - POST /products/read:', userData);
    const { userEmail } = userData;
    return this.productsService.getProductsByUserEmail(userEmail);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Aktualizacja produktu' })
  @ApiResponse({ status: 200, description: 'Produkt zaktualizowany' })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<any> {
    console.log('🔧 ProductsController - PUT /products/' + id, updateData);
    return this.productsService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuwanie produktu' })
  @ApiResponse({ status: 200, description: 'Produkt usunięty' })
  async deleteProduct(
    @Param('id') id: string,
    @Body() userData: any,
  ): Promise<any> {
    console.log('🗑️ ProductsController - DELETE /products/' + id, userData);
    const { userEmail } = userData;
    return this.productsService.deleteProduct(id, userEmail);
  }
}
