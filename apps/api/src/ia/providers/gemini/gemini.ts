// gemini.provider.ts
import { Injectable, Logger } from '@nestjs/common';
import { IAProvider } from '../../ia.provider.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { extractJsonFromText } from '../../utils/json-extractor';

@Injectable()
export class GeminiProvider implements IAProvider {
  private readonly logger;
  private readonly geminiApiKey: string;
  private readonly geminiModel: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger = new Logger(GeminiProvider.name);
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.geminiModel = this.configService.get<string>('GEMINI_MODEL');
  }

  async executePrompt(prompt: string): Promise<any> {
    this.logger.log(`Executing prompt with Gemini: ${prompt}`);

    try {
      const response = await this.httpService.axiosRef.post(
        `https://generativelanguage.googleapis.com/v1/models/${this.geminiModel}:generateContent`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.geminiApiKey,
          },
        },
      );

      // Extraer y parsear la respuesta JSON del texto generado
      const generatedText = response.data.candidates[0].content.parts[0].text;
      return extractJsonFromText(generatedText);
    } catch (error) {
      this.logger.error(`Error executing Gemini prompt: ${error.message}`);
      throw error;
    }
  }
}
