import { Test, TestingModule } from '@nestjs/testing';
import { EpicResolver } from './epic.resolver';

describe('EpicResolver', () => {
  let resolver: EpicResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpicResolver],
    }).compile();

    resolver = module.get<EpicResolver>(EpicResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
