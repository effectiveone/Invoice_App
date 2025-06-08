import { Injectable } from '@nestjs/common';

interface Faktura {
  id: string;
  userEmail: string;
  invoiceNumber: string;
  invoiceType: string;
  invoiceDate: string;
  invoiceSaleDate: string;
  invoicePaymentDate: string;
  selectedKontrahent: any;
  items: any[];
  totalNetValue: number;
  totalGrossValue: number;
  notes: string;
  createdAt: Date;
  [key: string]: any;
}

@Injectable()
export class FakturyService {
  private faktury: Map<string, Faktura[]> = new Map(); // Grupowane po userEmail
  private idCounter = 1;
  private invoiceCounters: Map<string, any> = new Map(); // Liczniki numerów faktur per user

  async createFaktura(fakturaData: any) {
    const { userEmail, ...data } = fakturaData;

    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('🔧 FakturyService - Creating faktura for:', userEmail, data);

    // Generuj numer faktury
    const invoiceNumber = this.generateInvoiceNumber(
      userEmail,
      data.invoiceType || 'sprzedazowa',
    );

    const newFaktura: Faktura = {
      id: (this.idCounter++).toString(),
      userEmail,
      invoiceNumber,
      ...data,
      createdAt: new Date(),
    };

    // Pobierz istniejące faktury użytkownika lub utwórz pustą tablicę
    const userFaktury = this.faktury.get(userEmail) || [];
    userFaktury.push(newFaktura);
    this.faktury.set(userEmail, userFaktury);

    console.log('✅ FakturyService - Faktura created:', newFaktura);

    return {
      message: 'Faktura została dodana',
      data: newFaktura,
    };
  }

  async getFakturyByUserEmail(userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('📥 FakturyService - Getting faktury for:', userEmail);

    const userFaktury = this.faktury.get(userEmail) || [];

    console.log('📤 FakturyService - Returning faktury:', userFaktury.length);

    return {
      message: 'Faktury pobrane',
      data: userFaktury,
    };
  }

  async getFakturaById(id: string) {
    console.log('📥 FakturyService - Getting faktura by ID:', id);

    // Szukaj faktury we wszystkich użytkownikach
    for (const userFaktury of this.faktury.values()) {
      const faktura = userFaktury.find((f) => f.id === id);
      if (faktura) {
        return {
          message: 'Faktura znaleziona',
          data: faktura,
        };
      }
    }

    throw new Error('Faktura not found');
  }

  async getInvoiceAllNumber(userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('📥 FakturyService - Getting invoice numbers for:', userEmail);

    // Pobierz lub utwórz liczniki dla użytkownika
    let userCounters = this.invoiceCounters.get(userEmail);
    if (!userCounters) {
      userCounters = {
        sprzedazowa: 'FV/2024/001',
        zakupowa: 'FZ/2024/001',
        koregujaca: 'FK/2024/001',
        zaliczkowa: 'FZA/2024/001',
        proformaSprzedazowa: 'PF/2024/001',
        proformaZakupowa: 'PZ/2024/001',
      };
      this.invoiceCounters.set(userEmail, userCounters);
    }

    return {
      message: 'Numery faktur pobrane',
      data: userCounters,
    };
  }

  private generateInvoiceNumber(
    userEmail: string,
    invoiceType: string,
  ): string {
    let userCounters = this.invoiceCounters.get(userEmail);
    if (!userCounters) {
      userCounters = {
        sprzedazowa: 'FV/2024/001',
        zakupowa: 'FZ/2024/001',
        koregujaca: 'FK/2024/001',
        zaliczkowa: 'FZA/2024/001',
        proformaSprzedazowa: 'PF/2024/001',
        proformaZakupowa: 'PZ/2024/001',
      };
      this.invoiceCounters.set(userEmail, userCounters);
    }

    const currentNumber = userCounters[invoiceType] || 'FV/2024/001';

    // Zwiększ licznik
    const parts = currentNumber.split('/');
    const number = parseInt(parts[2]) + 1;
    const newNumber = `${parts[0]}/${parts[1]}/${number.toString().padStart(3, '0')}`;

    userCounters[invoiceType] = newNumber;
    this.invoiceCounters.set(userEmail, userCounters);

    return currentNumber; // Zwróć aktualny numer, następny będzie dla kolejnej faktury
  }
}
