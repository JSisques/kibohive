import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PromptDto } from './dto/prompt.dto';
import { PromptService } from './prompt.service';
import { Logger } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Resolver()
export class PromptResolver {
  private readonly logger;
  constructor(private readonly promptService: PromptService) {
    this.logger = new Logger(PromptResolver.name);
  }

  @Query(() => [PromptDto])
  async getPrompts() {
    this.logger.log('Getting prompts');
    return this.promptService.getPrompts();
  }

  @Query(() => PromptDto)
  async getPromptById(@Args('id') id: string) {
    this.logger.log(`Getting prompt with id: ${id}`);
    return this.promptService.getPromptById(id);
  }

  @Query(() => PromptDto)
  async getPromptByName(@Args('name') name: string) {
    this.logger.log(`Getting prompt with name: ${name}`);
    return this.promptService.getPromptByName(name);
  }

  @Mutation(() => PromptDto)
  async createPrompt(@Args('input') input: CreatePromptDto) {
    this.logger.log(`Creating prompt: ${input}`);
    return this.promptService.createPrompt(input);
  }

  @Mutation(() => PromptDto)
  async updatePrompt(
    @Args('id') id: string,
    @Args('input') input: CreatePromptDto,
  ) {
    this.logger.log(`Updating prompt with id: ${id}`);
    return this.promptService.updatePrompt(id, input);
  }

  @Mutation(() => PromptDto)
  async deletePrompt(@Args('id') id: string) {
    this.logger.log(`Deleting prompt with id: ${id}`);
    return this.promptService.deletePrompt(id);
  }
}
