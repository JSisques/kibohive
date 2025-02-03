// ia.service.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IAProvider, IA_PROVIDER } from './ia.provider.interface';
import {
  IAPromptAnalysis,
  IAResponse,
} from './interfaces/ia-response.interface';
import { PROMPTS } from './config/prompts.config';

@Injectable()
export class IAService {
  private readonly logger;
  constructor(@Inject(IA_PROVIDER) private provider: IAProvider) {
    this.logger = new Logger(IAService.name);
  }

  public async executePrompt<T>(prompt: string): Promise<IAResponse<T>> {
    try {
      const response = await this.provider.executePrompt(prompt);
      this.logger.debug(`Response: ${JSON.stringify(response)}`);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      this.logger.error(`Error executing prompt: ${error.message}`);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }

  async analyzePrompt(
    promptContent: string,
  ): Promise<IAResponse<IAPromptAnalysis>> {
    try {
      // Obtener categoría
      const categoryPrompt = PROMPTS.assingCategory.replace(
        '{{prompt}}',
        promptContent,
      );
      const categoryResponse = await this.executePrompt<{ category: string }>(
        categoryPrompt,
      );

      // Obtener tags
      const tagsPrompt = PROMPTS.assignTags.replace(
        '{{prompt}}',
        promptContent,
      );
      const tagsResponse = await this.executePrompt<{ tags: string[] }>(
        tagsPrompt,
      );

      // Obtener LLMs recomendados
      const llmsPrompt = PROMPTS.assignLlms.replace(
        '{{prompt}}',
        promptContent,
      );
      const llmsResponse = await this.executePrompt<{ llm: string }>(
        llmsPrompt,
      );

      if (
        !categoryResponse.success ||
        !tagsResponse.success ||
        !llmsResponse.success
      ) {
        throw new Error('Error al analizar el prompt');
      }

      return {
        success: true,
        data: {
          category: categoryResponse.data.category,
          tags: tagsResponse.data.tags,
          llm: llmsResponse.data.llm,
        },
      };
    } catch (error) {
      this.logger.error(`Error analyzing prompt: ${error.message}`);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  }
}
