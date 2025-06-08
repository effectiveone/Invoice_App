import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'auth-service',
          brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log('🔐 Auth Microservice is listening on Kafka');
}
bootstrap();
