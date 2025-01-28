import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpicService } from './epic.service';
import { EpicDto } from './dto/epic.dto';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';

@Resolver()
export class EpicResolver {
  private readonly logger;
  constructor(private readonly epicService: EpicService) {
    this.logger = new Logger(EpicResolver.name);
  }

  @Query(() => [EpicDto])
  async getEpics(): Promise<EpicDto[]> {
    this.logger.log('Getting all epics');
    return this.epicService.getEpics();
  }

  @Query(() => EpicDto)
  async getEpicById(@Args('id') id: string): Promise<EpicDto> {
    this.logger.log(`Getting epic by id: ${id}`);
    return this.epicService.getEpicById(id);
  }

  @Mutation(() => EpicDto)
  async createEpic(@Args('input') input: CreateEpicDto): Promise<EpicDto> {
    this.logger.log(`Creating epic: ${input.title}`);
    return this.epicService.createEpic(input);
  }

  @Mutation(() => EpicDto)
  async updateEpic(
    @Args('id') id: string,
    @Args('input') input: UpdateEpicDto,
  ): Promise<EpicDto> {
    this.logger.log(`Updating epic: ${id}`);
    return this.epicService.updateEpic(id, input);
  }

  @Mutation(() => EpicDto)
  async deleteEpic(@Args('id') id: string): Promise<EpicDto> {
    this.logger.log(`Deleting epic: ${id}`);
    return this.epicService.deleteEpic(id);
  }
}
