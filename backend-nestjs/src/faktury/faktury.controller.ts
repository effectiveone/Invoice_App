import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FakturyService } from './faktury.service';

@ApiTags('faktury')
@Controller('auth')
export class FakturyController {
  constructor(private readonly fakturyService: FakturyService) {}

  @Post('faktury')
  @ApiOperation({ summary: 'Tworzenie nowej faktury' })
  @ApiResponse({ status: 201, description: 'Faktura została utworzona' })
  async createFaktura(@Body() fakturaData: any): Promise<any> {
    console.log('🔧 FakturyController - POST /auth/faktury:', fakturaData);
    return this.fakturyService.createFaktura(fakturaData);
  }

  @Post('get-faktury')
  @ApiOperation({ summary: 'Pobieranie faktur użytkownika' })
  @ApiResponse({ status: 200, description: 'Lista faktur' })
  async getFaktury(@Body() userData: any): Promise<any> {
    console.log('📥 FakturyController - POST /auth/get-faktury:', userData);
    const { userEmail } = userData;
    return this.fakturyService.getFakturyByUserEmail(userEmail);
  }

  @Post('get-invoice-all-number')
  @ApiOperation({ summary: 'Pobieranie numerów faktur' })
  @ApiResponse({ status: 200, description: 'Numery faktur' })
  async getInvoiceAllNumber(@Body() userData: any): Promise<any> {
    console.log(
      '📥 FakturyController - POST /auth/get-invoice-all-number:',
      userData,
    );
    const { userEmail } = userData;
    return this.fakturyService.getInvoiceAllNumber(userEmail);
  }

  @Get('faktury/:id')
  @ApiOperation({ summary: 'Pobieranie faktury po ID' })
  @ApiResponse({ status: 200, description: 'Faktura znaleziona' })
  async getFaktura(@Param('id') id: string): Promise<any> {
    console.log('📥 FakturyController - GET /auth/faktury/' + id);
    return this.fakturyService.getFakturaById(id);
  }
}
