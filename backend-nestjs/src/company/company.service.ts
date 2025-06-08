import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  // In-memory storage dla danych firm (w prawdziwej aplikacji byłaby baza danych)
  private companies: Map<string, any> = new Map();

  async createOrUpdateCompany(companyData: any) {
    const { userEmail, ...data } = companyData;

    if (!userEmail) {
      throw new Error('User email is required');
    }

    // Zapisz dane firmy dla użytkownika
    this.companies.set(userEmail, {
      ...data,
      userEmail,
      updatedAt: new Date(),
    });

    console.log('📊 Company Service - Saved company data for:', userEmail);

    return {
      message: 'Company data saved successfully',
      data: this.companies.get(userEmail),
    };
  }

  async getCompanyByUserEmail(userEmail: string) {
    if (!userEmail) {
      throw new Error('User email is required');
    }

    const companyData = this.companies.get(userEmail);

    if (!companyData) {
      // Zwróć pustą strukturę jeśli nie ma danych
      return {
        message: 'No company data found',
        data: {
          userEmail,
          companyName: '',
          legalForm: '',
          nip: '',
          regon: '',
          street: '',
          city: '',
          zipCode: '',
          bankName: '',
          bankAccount: '',
        },
      };
    }

    console.log('📊 Company Service - Retrieved company data for:', userEmail);

    return {
      message: 'Company data retrieved successfully',
      data: companyData,
    };
  }
}
