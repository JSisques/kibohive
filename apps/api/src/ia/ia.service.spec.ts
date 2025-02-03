import { Test, TestingModule } from '@nestjs/testing';
import { IAService } from './ia.service';

describe('IaService', () => {
  let service: IAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IAService],
    }).compile();

    service = module.get<IAService>(IAService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
