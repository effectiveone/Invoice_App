import { Controller, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Rejestracja użytkownika' })
  @ApiResponse({ status: 201, description: 'Użytkownik został utworzony' })
  @ApiResponse({ status: 409, description: 'Użytkownik już istnieje' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logowanie użytkownika' })
  @ApiResponse({ status: 200, description: 'Pomyślne logowanie' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowe dane logowania' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Delete('logout')
  @ApiOperation({ summary: 'Wylogowanie użytkownika' })
  @ApiResponse({ status: 200, description: 'Pomyślne wylogowanie' })
  async logout() {
    return { message: 'Pomyślnie wylogowano' };
  }

  @Put('settings')
  @ApiOperation({ summary: 'Aktualizacja ustawień użytkownika' })
  @ApiResponse({ status: 200, description: 'Ustawienia zaktualizowane' })
  async updateSettings(@Body() settingsData: any) {
    console.log('🔧 AuthController - PUT /settings:', settingsData);
    return this.authService.updateUserSettings(settingsData);
  }

  @Post('settings')
  @ApiOperation({ summary: 'Pobieranie ustawień użytkownika' })
  @ApiResponse({ status: 200, description: 'Ustawienia pobrane' })
  async getSettings(@Body() userData: any): Promise<any> {
    console.log('📥 AuthController - POST /settings:', userData);
    const { email } = userData;
    return this.authService.getUserSettings(email);
  }

  @Post('invoiceAllNumber')
  @ApiOperation({ summary: 'Pobieranie numerów faktur' })
  @ApiResponse({ status: 200, description: 'Numery faktur pobrane' })
  async getInvoiceAllNumber(@Body() userData: any): Promise<any> {
    console.log('📄 AuthController - POST /invoiceAllNumber:', userData);
    const { userEmail } = userData;
    return this.authService.getInvoiceAllNumber(userEmail);
  }

  @Post('faktury')
  @ApiOperation({ summary: 'Tworzenie faktury' })
  @ApiResponse({ status: 201, description: 'Faktura utworzona' })
  async createFaktura(@Body() fakturaData: any): Promise<any> {
    console.log('📄 AuthController - POST /faktury:', fakturaData);
    return this.authService.createFaktura(fakturaData);
  }

  @Post('get-faktury')
  @ApiOperation({ summary: 'Pobieranie faktur' })
  @ApiResponse({ status: 200, description: 'Faktury pobrane' })
  async getFaktury(@Body() userData: any): Promise<any> {
    console.log('📄 AuthController - POST /get-faktury:', userData);
    const { userEmail } = userData;
    return this.authService.getFaktury(userEmail);
  }

  @Post('edit-faktura')
  @ApiOperation({ summary: 'Edycja faktury' })
  @ApiResponse({ status: 200, description: 'Faktura zaktualizowana' })
  async editFaktura(@Body() fakturaData: any): Promise<any> {
    console.log('📄 AuthController - POST /edit-faktura:', fakturaData);
    return this.authService.editFaktura(fakturaData);
  }

  @Post('stats')
  @ApiOperation({ summary: 'Pobieranie statystyk faktur' })
  @ApiResponse({ status: 200, description: 'Statystyki pobrane' })
  async getInvoiceStats(@Body() userData: any): Promise<any> {
    console.log('📊 AuthController - POST /stats:', userData);
    const { userEmail } = userData;
    return this.authService.getInvoiceStats(userEmail);
  }

  @Post('salesStats')
  @ApiOperation({ summary: 'Pobieranie statystyk sprzedaży' })
  @ApiResponse({ status: 200, description: 'Statystyki sprzedaży pobrane' })
  async getSalesStats(@Body() userData: any): Promise<any> {
    console.log('📊 AuthController - POST /salesStats:', userData);
    const { userEmail } = userData;
    return this.authService.getSalesStats(userEmail);
  }

  @Post('jpk')
  @ApiOperation({ summary: 'Pobieranie danych JPK' })
  @ApiResponse({ status: 200, description: 'Dane JPK pobrane' })
  async getJpkData(@Body() userData: any): Promise<any> {
    console.log('📋 AuthController - POST /jpk:', userData);
    const { userEmail } = userData;
    return this.authService.getJpkData(userEmail);
  }

  @Post('send-jpk')
  @ApiOperation({ summary: 'Generowanie XML JPK' })
  @ApiResponse({ status: 200, description: 'XML JPK wygenerowany' })
  async getJpkXml(@Body() userData: any): Promise<any> {
    console.log('📋 AuthController - POST /send-jpk:', userData);
    return this.authService.getJpkXml(userData);
  }
}
