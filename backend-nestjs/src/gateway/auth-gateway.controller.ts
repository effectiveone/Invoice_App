import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

export class LoginDto {
  email: string;
  password: string;
}

export class RegisterDto {
  email: string;
  username: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('auth.login');
    this.authClient.subscribeToResponseOf('auth.register');
    this.authClient.subscribeToResponseOf('auth.validate');
    await this.authClient.connect();
  }

  @Post('login')
  @ApiOperation({ summary: 'Logowanie użytkownika' })
  @ApiResponse({ status: 200, description: 'Pomyślne logowanie' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowe dane logowania' })
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.authClient.send('auth.login', loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Rejestracja nowego użytkownika' })
  @ApiResponse({ status: 201, description: 'Pomyślna rejestracja' })
  @ApiResponse({ status: 400, description: 'Błędne dane rejestracji' })
  register(@Body() registerDto: RegisterDto): Observable<any> {
    return this.authClient.send('auth.register', registerDto);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Walidacja tokenu JWT' })
  @ApiResponse({ status: 200, description: 'Token ważny' })
  @ApiResponse({ status: 401, description: 'Token nieważny' })
  validateToken(@Body() token: { token: string }): Observable<any> {
    return this.authClient.send('auth.validate', token);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Pobierz profil użytkownika' })
  @ApiBearerAuth()
  getProfile(@Request() req): Observable<any> {
    return this.authClient.send('auth.profile', { userId: req.user?.id });
  }
}
