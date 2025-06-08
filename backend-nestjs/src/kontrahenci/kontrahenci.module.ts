import { Module } from '@nestjs/common';
import { KontrahenciController } from './kontrahenci.controller';
import { KontrahenciService } from './kontrahenci.service';

@Module({
  controllers: [KontrahenciController],
  providers: [KontrahenciService]
})
export class KontrahenciModule {}
