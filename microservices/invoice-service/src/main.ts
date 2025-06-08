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
          clientId: 'invoice-service',
          brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
        },
        consumer: {
          groupId: 'invoice-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log('📄 Invoice Microservice is listening on Kafka');
}
bootstrap();
