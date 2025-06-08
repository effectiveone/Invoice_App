import { Test, TestingModule } from '@nestjs/testing';
import { FakturyService } from './faktury.service';

describe('FakturyService', () => {
  let service: FakturyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakturyService],
    }).compile();

    service = module.get<FakturyService>(FakturyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
