import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth.register')
  async register(@Payload() data: any) {
    return this.appService.register(data);
  }

  @MessagePattern('auth.login')
  async login(@Payload() data: any) {
    return this.appService.login(data);
  }

  @MessagePattern('auth.validate')
  async validateToken(@Payload() data: any) {
    return this.appService.validateToken(data.token);
  }

  @MessagePattern('auth.user.get')
  async getUser(@Payload() data: any) {
    return this.appService.getUser(data.userId);
  }
}
