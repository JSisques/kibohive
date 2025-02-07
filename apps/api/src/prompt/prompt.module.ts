import { Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptResolver } from './prompt.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [PromptService, PromptResolver],
  exports: [PromptService],
})
export class PromptModule {}
