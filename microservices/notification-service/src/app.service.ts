import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'localhost',
      port: parseInt(process.env.MAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendEmail(data: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }) {
    try {
      const result = await this.transporter.sendMail({
        from: process.env.MAIL_FROM_ADDRESS || 'noreply@invoiceapp.com',
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
      });

      console.log('📧 Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async handleInvoiceCreated(data: { invoice: any; userEmail: string }) {
    const emailData = {
      to: data.userEmail,
      subject: `Faktura ${data.invoice.invoiceNumber} została utworzona`,
      html: `
        <h2>Nowa faktura została utworzona</h2>
        <p>Numer faktury: <strong>${data.invoice.invoiceNumber}</strong></p>
        <p>Data wystawienia: ${new Date(data.invoice.issueDate).toLocaleDateString('pl-PL')}</p>
        <p>Kwota brutto: ${data.invoice.grossAmount} PLN</p>
        <p>Status: ${data.invoice.status}</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  async sendPaymentReminder(data: {
    invoice: any;
    userEmail: string;
    daysOverdue: number;
  }) {
    const emailData = {
      to: data.userEmail,
      subject: `Przypomnienie o płatności - Faktura ${data.invoice.invoiceNumber}`,
      html: `
        <h2>Przypomnienie o płatności</h2>
        <p>Faktura <strong>${data.invoice.invoiceNumber}</strong> jest przeterminowana o ${data.daysOverdue} dni.</p>
        <p>Kwota do zapłaty: ${data.invoice.grossAmount} PLN</p>
        <p>Termin płatności: ${new Date(data.invoice.dueDate).toLocaleDateString('pl-PL')}</p>
        <p>Prosimy o niezwłoczną płatność.</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  async handleUserRegistered(data: { user: any }) {
    const emailData = {
      to: data.user.email,
      subject: 'Witamy w InvoiceApp!',
      html: `
        <h2>Witamy w InvoiceApp!</h2>
        <p>Dziękujemy za rejestrację, ${data.user.username}!</p>
        <p>Twoje konto zostało pomyślnie utworzone.</p>
        <p>Możesz już zacząć tworzyć faktury i zarządzać swoim biznesem.</p>
      `,
    };

    return this.sendEmail(emailData);
  }

  getHello(): string {
    return 'Notification Service is running!';
  }
}
