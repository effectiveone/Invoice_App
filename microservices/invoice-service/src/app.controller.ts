import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('invoice.create')
  async createInvoice(@Payload() data: any) {
    return this.appService.createInvoice(data);
  }

  @MessagePattern('invoice.get')
  async getInvoice(@Payload() data: any) {
    return this.appService.getInvoice(data.id);
  }

  @MessagePattern('invoice.list')
  async listInvoices(@Payload() data: any) {
    return this.appService.listInvoices(data.userId);
  }

  @MessagePattern('invoice.update')
  async updateInvoice(@Payload() data: any) {
    return this.appService.updateInvoice(data.id, data.updateData);
  }

  @MessagePattern('invoice.delete')
  async deleteInvoice(@Payload() data: any) {
    return this.appService.deleteInvoice(data.id);
  }

  @MessagePattern('product.create')
  async createProduct(@Payload() data: any) {
    return this.appService.createProduct(data);
  }

  @MessagePattern('product.list')
  async listProducts(@Payload() data: any) {
    return this.appService.listProducts(data.userId);
  }

  @MessagePattern('kontrahent.create')
  async createKontrahent(@Payload() data: any) {
    return this.appService.createKontrahent(data);
  }

  @MessagePattern('kontrahent.list')
  async listKontrahenci(@Payload() data: any) {
    return this.appService.listKontrahenci(data.userId);
  }
}
