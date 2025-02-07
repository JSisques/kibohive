import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
@Injectable()
export class PromptService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(PromptService.name);
  }

  async getPrompts() {
    return this.prisma.prompt.findMany();
  }

  async getPromptById(id: string) {
    return this.prisma.prompt.findUnique({ where: { id } });
  }

  async getPromptByName(name: string) {
    return this.prisma.prompt.findUnique({ where: { name } });
  }

  async createPrompt(prompt: CreatePromptDto) {
    return this.prisma.prompt.create({ data: prompt });
  }

  async updatePrompt(id: string, prompt: CreatePromptDto) {
    return this.prisma.prompt.update({ where: { id }, data: prompt });
  }

  async deletePrompt(id: string) {
    return this.prisma.prompt.delete({ where: { id } });
  }
}
