import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
          },
        },
      },
      {
        name: 'INVOICE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'invoice',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'invoice-consumer',
          },
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'product',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'product-consumer',
          },
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notification',
            brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'notification-consumer',
          },
        },
      },
    ]),
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
