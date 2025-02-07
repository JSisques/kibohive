import { Test, TestingModule } from '@nestjs/testing';
import { AiAssistantResolver } from './ai-assistant.resolver';

describe('AiAssistantResolver', () => {
  let resolver: AiAssistantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiAssistantResolver],
    }).compile();

    resolver = module.get<AiAssistantResolver>(AiAssistantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
