import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface User {
  id: string;
  mail: string;
  username: string;
  password: string;
  createdAt: Date;
}

interface UserSettings {
  email: string;
  lang?: string;
  designName?: string;
  templateInvoice?: string;
  theme?: string;
  [key: string]: any;
}

@Injectable()
export class AuthService {
  private users: User[] = []; // Tymczasowa baza w pamięci
  private userSettings: Map<string, UserSettings> = new Map(); // Ustawienia użytkowników

  constructor(private jwtService: JwtService) {
    this.initializeDefaultUser();
  }

  private async initializeDefaultUser() {
    const defaultUser = {
      id: '1',
      mail: 'demo@invoiceapp.com',
      username: 'demo',
      password: await bcrypt.hash('demo123', 12),
      createdAt: new Date(),
    };

    this.users.push(defaultUser);

    this.userSettings.set('demo@invoiceapp.com', {
      email: 'demo@invoiceapp.com',
      lang: 'pl',
      designName: 'Material Palenight',
      templateInvoice: 'basicInput',
      theme: 'light',
    });

    console.log(
      '✅ AuthService - Utworzono domyślnego użytkownika: demo@invoiceapp.com / demo123',
    );
  }

  async register(registerDto: RegisterDto) {
    const { mail, username, password } = registerDto;

    // Check if user already exists
    const existingUser = this.users.find((user) => user.mail === mail);
    if (existingUser) {
      throw new ConflictException('Użytkownik z tym emailem już istnieje');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user: User = {
      id: Date.now().toString(),
      mail,
      username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(user);

    // Initialize default settings for new user
    this.userSettings.set(mail, {
      email: mail,
      lang: 'en',
      designName: 'Material Palenight',
      templateInvoice: 'basicInput',
      theme: 'light',
    });

    // Generate JWT token for new user
    const payload = { userId: user.id, mail: user.mail };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Użytkownik został utworzony pomyślnie',
      userDetails: {
        id: user.id,
        mail: user.mail,
        username: user.username,
        token,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { mail, password } = loginDto;

    // Find user
    const user = this.users.find((u) => u.mail === mail);
    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    // Initialize default settings if not exist
    if (!this.userSettings.has(mail)) {
      this.userSettings.set(mail, {
        email: mail,
        lang: 'en',
        designName: 'Material Palenight',
        templateInvoice: 'basicInput',
        theme: 'light',
      });
    }

    // Generate JWT token
    const payload = { userId: user.id, mail: user.mail };
    const token = this.jwtService.sign(payload);

    return {
      userDetails: {
        id: user.id,
        mail: user.mail,
        username: user.username,
        token,
      },
    };
  }

  async validateUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new UnauthorizedException('Użytkownik nie znaleziony');
    }

    return {
      id: user.id,
      mail: user.mail,
      username: user.username,
    };
  }

  // Nowe metody dla ustawień
  async updateUserSettings(settingsData: any) {
    const { email, ...settings } = settingsData;

    if (!email) {
      throw new Error('Email is required');
    }

    console.log('🔧 AuthService - Updating settings for:', email, settings);

    // Pobierz istniejące ustawienia lub utwórz domyślne
    const existingSettings = this.userSettings.get(email) || {
      email,
      lang: 'en',
      designName: 'Material Palenight',
      templateInvoice: 'basicInput',
      theme: 'light',
    };

    // Zaktualizuj ustawienia
    const updatedSettings = {
      ...existingSettings,
      ...settings,
      email, // Upewnij się, że email jest zachowany
    };

    this.userSettings.set(email, updatedSettings);

    console.log('✅ AuthService - Settings updated:', updatedSettings);

    return {
      message: 'Ustawienia zaktualizowane',
      settings: updatedSettings,
    };
  }

  async getUserSettings(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    console.log('📥 AuthService - Getting settings for:', email);

    // Pobierz ustawienia lub zwróć domyślne
    const settings = this.userSettings.get(email) || {
      email,
      lang: 'en',
      designName: 'Material Palenight',
      templateInvoice: 'basicInput',
      theme: 'light',
    };

    console.log('📤 AuthService - Returning settings:', settings);

    return settings;
  }

  async getInvoiceAllNumber(userEmail: string) {
    if (!userEmail) {
      throw new Error('UserEmail is required');
    }

    console.log('📄 AuthService - Getting invoice numbers for:', userEmail);

    // Zwracamy domyślne numery faktur dla użytkownika
    // W prawdziwej aplikacji to byłoby pobierane z bazy danych
    const invoiceNumbers = {
      sprzedazowa: 'FV/001/2025',
      zakupowa: 'FZ/001/2025',
      koregujaca: 'FK/001/2025',
      zaliczkowa: 'FZA/001/2025',
      proformaSprzedazowa: 'PF/001/2025',
      proformaZakupowa: 'PZ/001/2025',
    };

    console.log('📤 AuthService - Returning invoice numbers:', invoiceNumbers);

    return invoiceNumbers;
  }

  async createFaktura(fakturaData: any) {
    console.log('📄 AuthService - Creating faktura:', fakturaData);

    // Symulacja tworzenia faktury
    const faktura = {
      id: Date.now().toString(),
      ...fakturaData,
      createdAt: new Date(),
    };

    return {
      message: 'Faktura utworzona',
      data: faktura,
    };
  }

  async getFaktury(userEmail: string) {
    console.log('📄 AuthService - Getting faktury for:', userEmail);

    // Zwracamy przykładowe faktury
    const faktury = [
      {
        id: '1',
        invoiceNumber: 'FV/001/2025',
        userEmail,
        totalNetValue: 1000,
        totalGrossValue: 1230,
        createdAt: new Date(),
      },
    ];

    return {
      message: 'Faktury pobrane',
      data: faktury,
    };
  }

  async editFaktura(fakturaData: any) {
    console.log('📄 AuthService - Editing faktura:', fakturaData);

    // Symulacja edycji faktury
    const updatedFaktura = {
      ...fakturaData,
      updatedAt: new Date(),
    };

    return {
      message: 'Faktura zaktualizowana',
      data: updatedFaktura,
    };
  }

  async getInvoiceStats(userEmail: string) {
    console.log('📊 AuthService - Getting invoice stats for:', userEmail);

    // Zwracamy przykładowe statystyki
    const stats = {
      totalInvoices: 10,
      totalNetValue: 10000,
      totalGrossValue: 12300,
      monthlyStats: {
        '2025-01': { count: 5, netValue: 5000, grossValue: 6150 },
        '2025-02': { count: 5, netValue: 5000, grossValue: 6150 },
      },
    };

    return {
      message: 'Statystyki pobrane',
      data: stats,
    };
  }

  async getSalesStats(userEmail: string) {
    console.log('📊 AuthService - Getting sales stats for:', userEmail);

    // Zwracamy przykładowe statystyki sprzedaży
    const salesStats = {
      totalSales: 15000,
      monthlySales: {
        '2025-01': 7500,
        '2025-02': 7500,
      },
      topProducts: [
        { name: 'Product 1', sales: 5000 },
        { name: 'Product 2', sales: 3000 },
      ],
    };

    return {
      message: 'Statystyki sprzedaży pobrane',
      data: salesStats,
    };
  }

  async getJpkData(userEmail: string) {
    console.log('📋 AuthService - Getting JPK data for:', userEmail);

    // Zwracamy przykładowe dane JPK
    const jpkData = {
      jpk: {
        allInvoices: [
          {
            id: '1',
            invoiceNumber: 'FV/001/2025',
            netValue: 1000,
            grossValue: 1230,
            vatValue: 230,
          },
        ],
      },
    };

    return {
      message: 'Dane JPK pobrane',
      data: jpkData,
    };
  }

  async getJpkXml(userData: any) {
    console.log('📋 AuthService - Generating JPK XML:', userData);

    // Zwracamy przykładowy XML JPK
    const jpkXml = `<?xml version="1.0" encoding="UTF-8"?>
<JPK xmlns="http://jpk.mf.gov.pl/wzor/2016/03/09/03134/">
  <Naglowek>
    <KodFormularza kodSystemowy="JPK_VAT (3)" wersjaSchemy="1-1">JPK_VAT</KodFormularza>
    <WariantFormularza>3</WariantFormularza>
    <CelZlozenia poz="P_7">1</CelZlozenia>
    <DataWytworzeniaJPK>2025-06-01T07:00:00</DataWytworzeniaJPK>
  </Naglowek>
</JPK>`;

    return {
      message: 'XML JPK wygenerowany',
      data: jpkXml,
    };
  }
}
