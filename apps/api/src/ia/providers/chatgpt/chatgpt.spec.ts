import { Test, TestingModule } from '@nestjs/testing';
import { Chatgpt } from './chatgpt';

describe('Chatgpt', () => {
  let provider: Chatgpt;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Chatgpt],
    }).compile();

    provider = module.get<Chatgpt>(Chatgpt);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
