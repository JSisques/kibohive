import { Test, TestingModule } from '@nestjs/testing';
import { Gemini } from './gemini';

describe('Gemini', () => {
  let provider: Gemini;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Gemini],
    }).compile();

    provider = module.get<Gemini>(Gemini);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
