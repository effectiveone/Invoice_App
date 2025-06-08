import { Test, TestingModule } from '@nestjs/testing';
import { FakturyController } from './faktury.controller';

describe('FakturyController', () => {
  let controller: FakturyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakturyController],
    }).compile();

    controller = module.get<FakturyController>(FakturyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
