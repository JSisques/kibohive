import { Module } from '@nestjs/common';
import { AiAssistantResolver } from './ai-assistant.resolver';
import { AiAssistantService } from './ai-assistant.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompanyService } from 'src/company/company.service';
import { IAModule } from 'src/ia/ia.module';
import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  imports: [PrismaModule, IAModule, PromptModule],
  providers: [AiAssistantResolver, AiAssistantService, CompanyService],
  exports: [AiAssistantService],
})
export class AiAssistantModule {}
