import { Test, TestingModule } from '@nestjs/testing';
import { KontrahenciService } from './kontrahenci.service';

describe('KontrahenciService', () => {
  let service: KontrahenciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KontrahenciService],
    }).compile();

    service = module.get<KontrahenciService>(KontrahenciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
