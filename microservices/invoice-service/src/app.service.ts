import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(data: any) {
    const invoice = await this.prisma.invoice.create({
      data: {
        ...data,
        items: {
          create: data.items || [],
        },
      },
      include: {
        items: true,
      },
    });

    return invoice;
  }

  async getInvoice(id: string) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  async listInvoices(userId: string) {
    return this.prisma.invoice.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateInvoice(id: string, updateData: any) {
    return this.prisma.invoice.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
      },
    });
  }

  async deleteInvoice(id: string) {
    return this.prisma.invoice.delete({
      where: { id },
    });
  }

  async createProduct(data: any) {
    return this.prisma.product.create({
      data,
    });
  }

  async listProducts(userId: string) {
    return this.prisma.product.findMany({
      where: { userId, isActive: true },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createKontrahent(data: any) {
    return this.prisma.kontrahent.create({
      data,
    });
  }

  async listKontrahenci(userId: string) {
    return this.prisma.kontrahent.findMany({
      where: { userId, isActive: true },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
