import { Injectable, Logger } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { IAService } from 'src/ia/ia.service';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { PromptService } from 'src/prompt/prompt.service';
@Injectable()
export class AiAssistantService {
  private readonly logger;

  constructor(
    private readonly iaService: IAService,
    private readonly companyService: CompanyService,
    private readonly promptService: PromptService,
  ) {
    this.logger = new Logger(AiAssistantService.name);
  }

  async executeUserQuery(input: CreateUserQueryDto): Promise<UserQueryDto> {
    this.logger.log(`Solicitud de respuesta: ${input}`);

    const company = JSON.stringify(
      await this.companyService.getCompanyByClerkId(input.clerkCompanyId),
    );
    const userQuery = input.userQuery;
    const conversationHistory = input.conversationHistory;

    const prompt = await this.promptService.getPromptByName('ai-assistant');

    this.logger.debug(`Prompt: ${prompt.description}`);

    const promptWithVariables = prompt.description
      .replace('${company}', company)
      .replace('${userQuery}', userQuery)
      .replace('${conversationHistory}', conversationHistory || '[]');

    this.logger.debug(`Prompt with variables: ${promptWithVariables}`);

    const response = await this.iaService.executePrompt(promptWithVariables);
    const data = response.data as any;

    return { response: data.response };
  }
}
