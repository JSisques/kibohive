import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpicService } from './epic.service';
import { EpicDto } from './dto/epic.dto';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { IAService } from 'src/ia/ia.service';

@Resolver()
export class EpicResolver {
  private readonly logger;
  constructor(
    private readonly epicService: EpicService,
    private readonly iaService: IAService,
  ) {
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
  async createEpic(
    @Args('input') input: CreateEpicDto,
    @Args('useAI') useAI: boolean,
    @Args('autoAssign') autoAssign: boolean,
  ): Promise<EpicDto> {
    this.logger.log(`Creating epic: ${input.title}`);

    // Creamos la épica
    const epic = await this.epicService.createEpic(input);

    // Desglosamos la épica en tareas
    if (useAI) {
      const generatedTasksByLlm = await this.iaService.executePrompt(
        `Desglosa la épica con titulo ${epic.title} y descripcion ${epic.description} en tareas, el formato de las tareas debe ser el siguiente:
        {
          "title": "Tarea 1",
          "description": "Descripción de la tarea 1",
          "assignedTo": "Usuario asignado a la tarea 1"
        }`,
      );

      this.logger.debug(
        `Generated tasks by LLM: ${JSON.stringify(generatedTasksByLlm)}`,
      );

      const tasks = JSON.parse(generatedTasksByLlm.data as string);

      tasks.forEach((task: any) => {
        this.logger.debug(
          `Creating task: ${task.title}, ${task.description}, ${task.assignedTo}`,
        );
      });

      // Asignamos las tareas a los usuarios
      if (autoAssign) {
        this.logger.log('Auto assigning tasks to users');
      }
    }

    return epic;
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
