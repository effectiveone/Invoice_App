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

@Controller('invoices')
export class InvoiceGatewayController {
  constructor(@Inject('INVOICE_SERVICE') private invoiceClient: ClientKafka) {}

  @Post()
  async createInvoice(@Body() invoiceData: any) {
    try {
      const result = await this.invoiceClient
        .send('invoice.create', invoiceData)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  async getInvoice(@Param('id') id: string) {
    try {
      const result = await this.invoiceClient
        .send('invoice.get', { id })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('user/:userId')
  async listInvoices(@Param('userId') userId: string) {
    try {
      const result = await this.invoiceClient
        .send('invoice.list', { userId })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  async updateInvoice(@Param('id') id: string, @Body() updateData: any) {
    try {
      const result = await this.invoiceClient
        .send('invoice.update', { id, updateData })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    try {
      const result = await this.invoiceClient
        .send('invoice.delete', { id })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Kontrahenci endpoints
  @Post('kontrahenci')
  async createKontrahent(@Body() kontrahentData: any) {
    try {
      const result = await this.invoiceClient
        .send('kontrahent.create', kontrahentData)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get('kontrahenci/user/:userId')
  async listKontrahenci(@Param('userId') userId: string) {
    try {
      const result = await this.invoiceClient
        .send('kontrahent.list', { userId })
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
