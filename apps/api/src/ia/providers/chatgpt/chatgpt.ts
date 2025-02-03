// chatgpt.provider.ts
import { Injectable, Logger } from '@nestjs/common';
import { IAProvider } from '../../ia.provider.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { extractJsonFromText } from '../../utils/json-extractor';

@Injectable()
export class ChatGPTProvider implements IAProvider {
  private readonly logger;
  private readonly chatgptApiKey: string;
  private readonly chatgptModel: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(ChatGPTProvider.name);
    this.chatgptApiKey = this.configService.get<string>('CHATGPT_API_KEY');
    this.chatgptModel = this.configService.get<string>('CHATGPT_MODEL');
  }

  async executePrompt(prompt: string): Promise<any> {
    this.logger.log(`Executing prompt with ChatGPT: ${prompt}`);

    try {
      const response = await this.httpService.axiosRef.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.chatgptModel,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.chatgptApiKey}`,
          },
        },
      );

      // Extraer y parsear la respuesta JSON del texto generado
      const generatedText = response.data.choices[0].message.content;
      return extractJsonFromText(generatedText);
    } catch (error) {
      this.logger.error(`Error executing ChatGPT prompt: ${error.message}`);
      throw error;
    }
  }
}
