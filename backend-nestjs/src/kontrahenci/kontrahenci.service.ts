import { Injectable } from '@nestjs/common';

interface Kontrahent {
  id: string;
  userEmail: string;
  name: string;
  nip?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  [key: string]: any;
}

@Injectable()
export class KontrahenciService {
  private kontrahenci: Map<string, Kontrahent[]> = new Map(); // Grupowane po userEmail
  private idCounter = 1;

  async createKontrahent(kontrahentData: any) {
    const { userEmail, ...data } = kontrahentData;

    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log(
      '🔧 KontrahenciService - Creating kontrahent for:',
      userEmail,
      data,
    );

    const newKontrahent: Kontrahent = {
      id: (this.idCounter++).toString(),
      userEmail,
      ...data,
      createdAt: new Date(),
    };

    // Pobierz istniejących kontrahentów użytkownika lub utwórz pustą tablicę
    const userKontrahenci = this.kontrahenci.get(userEmail) || [];
    userKontrahenci.push(newKontrahent);
    this.kontrahenci.set(userEmail, userKontrahenci);

    console.log('✅ KontrahenciService - Kontrahent created:', newKontrahent);

    return {
      message: 'Kontrahent został dodany',
      data: newKontrahent,
    };
  }

  async getKontrahenciByUserEmail(userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('📥 KontrahenciService - Getting kontrahenci for:', userEmail);

    const userKontrahenci = this.kontrahenci.get(userEmail) || [];

    console.log(
      '📤 KontrahenciService - Returning kontrahenci:',
      userKontrahenci.length,
    );

    return {
      message: 'Kontrahenci pobrani',
      data: userKontrahenci,
    };
  }

  async updateKontrahent(id: string, updateData: any) {
    const { userEmail, ...data } = updateData;

    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('🔧 KontrahenciService - Updating kontrahent:', id, data);

    const userKontrahenci = this.kontrahenci.get(userEmail) || [];
    const kontrahentIndex = userKontrahenci.findIndex((k) => k.id === id);

    if (kontrahentIndex === -1) {
      throw new Error('Kontrahent not found');
    }

    // Aktualizuj kontrahenta
    userKontrahenci[kontrahentIndex] = {
      ...userKontrahenci[kontrahentIndex],
      ...data,
    };

    this.kontrahenci.set(userEmail, userKontrahenci);

    console.log(
      '✅ KontrahenciService - Kontrahent updated:',
      userKontrahenci[kontrahentIndex],
    );

    return {
      message: 'Kontrahent zaktualizowany',
      data: userKontrahenci[kontrahentIndex],
    };
  }

  async deleteKontrahent(id: string, userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log(
      '🗑️ KontrahenciService - Deleting kontrahent:',
      id,
      'for user:',
      userEmail,
    );

    const userKontrahenci = this.kontrahenci.get(userEmail) || [];
    const kontrahentIndex = userKontrahenci.findIndex((k) => k.id === id);

    if (kontrahentIndex === -1) {
      throw new Error('Kontrahent not found');
    }

    // Usuń kontrahenta
    const deletedKontrahent = userKontrahenci.splice(kontrahentIndex, 1)[0];
    this.kontrahenci.set(userEmail, userKontrahenci);

    console.log(
      '✅ KontrahenciService - Kontrahent deleted:',
      deletedKontrahent,
    );

    return {
      message: 'Kontrahent usunięty',
      data: deletedKontrahent,
    };
  }
}
