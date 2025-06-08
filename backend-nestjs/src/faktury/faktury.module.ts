import { Module } from '@nestjs/common';
import { FakturyController } from './faktury.controller';
import { FakturyService } from './faktury.service';

@Module({
  controllers: [FakturyController],
  providers: [FakturyService],
})
export class FakturyModule {}
