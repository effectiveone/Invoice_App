import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('notification.email.send')
  async sendEmail(@Payload() data: any) {
    return this.appService.sendEmail(data);
  }

  @MessagePattern('notification.invoice.created')
  async handleInvoiceCreated(@Payload() data: any) {
    return this.appService.handleInvoiceCreated(data);
  }

  @MessagePattern('notification.payment.reminder')
  async sendPaymentReminder(@Payload() data: any) {
    return this.appService.sendPaymentReminder(data);
  }

  @MessagePattern('notification.user.registered')
  async handleUserRegistered(@Payload() data: any) {
    return this.appService.handleUserRegistered(data);
  }
}
