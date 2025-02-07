import { Test, TestingModule } from '@nestjs/testing';
import { PromptResolver } from './prompt.resolver';

describe('PromptResolver', () => {
  let resolver: PromptResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromptResolver],
    }).compile();

    resolver = module.get<PromptResolver>(PromptResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
