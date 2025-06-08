import { Test, TestingModule } from '@nestjs/testing';
import { KontrahenciController } from './kontrahenci.controller';

describe('KontrahenciController', () => {
  let controller: KontrahenciController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KontrahenciController],
    }).compile();

    controller = module.get<KontrahenciController>(KontrahenciController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
