import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AiAssistantService } from './ai-assistant.service';
import { Logger } from '@nestjs/common';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Resolver()
export class AiAssistantResolver {
  private readonly logger;

  constructor(private readonly aiAssistantService: AiAssistantService) {
    this.logger = new Logger(AiAssistantResolver.name);
  }

  @Mutation(() => UserQueryDto)
  async executeUserQuery(@Args('input') input: CreateUserQueryDto) {
    this.logger.log(`Solicitud de respuesta: ${input}`);
    const response = await this.aiAssistantService.executeUserQuery(input);
    this.logger.log(`Respuesta: ${JSON.stringify(response)}`);
    return response;
  }
}
