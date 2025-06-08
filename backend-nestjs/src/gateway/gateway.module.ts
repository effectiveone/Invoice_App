import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthGatewayController } from './auth-gateway.controller';
import { InvoiceGatewayController } from './invoice-gateway.controller';
import { ProductGatewayController } from './product-gateway.controller';
import { NotificationGatewayController } from './notification-gateway.controller';
import { UtilityGatewayController } from './utility-gateway.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AuthGatewayController,
    InvoiceGatewayController,
    ProductGatewayController,
    NotificationGatewayController,
    UtilityGatewayController,
  ],
})
export class GatewayModule {}
