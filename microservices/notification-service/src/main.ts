import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Stwórz mikroserwis Kafka
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notification-service',
          brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
        },
        consumer: {
          groupId: 'notification-consumer',
        },
      },
    },
  );

  // Dodatkowo stwórz HTTP serwer dla health checks
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  await httpApp.listen(3004);

  await app.listen();
  console.log(
    '📧 Notification Microservice is listening on Kafka and port 3004',
  );
}
bootstrap();
