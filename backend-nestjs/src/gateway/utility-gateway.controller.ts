import { Controller, Get, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('utility')
export class UtilityGatewayController {
  private readonly utilityServiceUrl =
    process.env.UTILITY_SERVICE_URL || 'http://utility-service-php';

  constructor(private readonly httpService: HttpService) {}

  @Get('health')
  async healthCheck() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.utilityServiceUrl}/health`),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('validate-nip')
  async validateNIP(@Body() data: { nip: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.utilityServiceUrl}/validate-nip`, data),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('generate-qr')
  async generateQR(@Body() data: { data: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.utilityServiceUrl}/generate-qr`, data),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('validate-email')
  async validateEmail(@Body() data: { email: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.utilityServiceUrl}/validate-email`, data),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('format-currency')
  async formatCurrency(
    @Body() data: { amount: number; currency?: string; locale?: string },
  ) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.utilityServiceUrl}/format-currency`,
          data,
        ),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('exchange-rates')
  async getExchangeRates() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.utilityServiceUrl}/exchange-rates`),
      );
      return response.data;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
