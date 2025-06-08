import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'analytics-service',
        brokers: process.env.KAFKA_BROKERS?.split(',') || ['localhost:9092'],
      },
      consumer: {
        groupId: 'analytics-service-consumer',
      },
    },
  });

  // Also create HTTP server for health checks and direct API calls
  const httpApp = await NestFactory.create(AppModule);
  httpApp.enableCors();
  await httpApp.listen(3004);

  await app.listen();
  console.log('Analytics microservice is listening on port 3004');
}
bootstrap(); 