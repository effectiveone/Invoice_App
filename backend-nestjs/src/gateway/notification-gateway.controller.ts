import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('notifications')
export class NotificationGatewayController {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientKafka,
  ) {}

  @Post('send-email')
  async sendEmail(@Body() emailData: any) {
    try {
      const result = await this.notificationClient
        .send('notification.email.send', emailData)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('invoice-created')
  async notifyInvoiceCreated(@Body() data: any) {
    try {
      const result = await this.notificationClient
        .send('notification.invoice.created', data)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('payment-reminder')
  async sendPaymentReminder(@Body() data: any) {
    try {
      const result = await this.notificationClient
        .send('notification.payment.reminder', data)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('user-registered')
  async notifyUserRegistered(@Body() data: any) {
    try {
      const result = await this.notificationClient
        .send('notification.user.registered', data)
        .toPromise();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
