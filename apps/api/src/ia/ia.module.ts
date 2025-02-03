import { Module } from '@nestjs/common';
import { IAService } from './ia.service';
import { IA_PROVIDER } from './ia.provider.interface';
import { GeminiProvider } from './providers/gemini/gemini';
import { ChatGPTProvider } from './providers/chatgpt/chatgpt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [
    IAService,
    {
      provide: IA_PROVIDER,
      useFactory: (configService: ConfigService, httpService: HttpService) => {
        const provider = configService.get<string>('IA_PROVIDER');

        switch (provider?.toLowerCase()) {
          case 'gemini':
            return new GeminiProvider(configService, httpService);
          case 'chatgpt':
            return new ChatGPTProvider(configService, httpService);
          default:
            throw new Error(`Provider de IA no soportado: ${provider}`);
        }
      },
      inject: [ConfigService, HttpService],
    },
  ],
  exports: [IAService],
})
export class IAModule {}
