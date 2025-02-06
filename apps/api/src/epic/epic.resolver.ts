import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { EpicService } from './epic.service';
import { EpicDto } from './dto/epic.dto';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { IAService } from 'src/ia/ia.service';
import { TaskService } from 'src/task/task.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { CompanyService } from 'src/company/company.service';
@Resolver()
export class EpicResolver {
  private readonly logger;
  constructor(
    private readonly epicService: EpicService,
    private readonly iaService: IAService,
    private readonly taskService: TaskService,
    private readonly companyService: CompanyService,
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
      // Obtenemos la empresa de la épica
      const company = await this.companyService.getCompanyByClerkId(
        input.clerkCompanyId,
      );

      this.logger.debug(`Company: ${company.name}`);

      const generatedTasksByLlm = await this.iaService.executePrompt(
        `Desglosa la épica con titulo ${epic.title} y descripcion ${epic.description} en tareas, no utilices simbolos especiales, ciñete a solo responder con las tareas, no pongas número a las tareas, el formato de las tareas debe de ser un array de objetos, el formato de cada tarea debe ser el siguiente:
        {
          "title": <Titulo de la tarea>,
          "description": <Descripción detallada de la tarea>,
          "dueDate": <Fecha de entrega de la tarea>,
        }`,
      );

      this.logger.debug(
        `Generated tasks by LLM: ${JSON.stringify(generatedTasksByLlm.data)}`,
      );

      const tasks = generatedTasksByLlm.data as any[];

      const inputTasks: CreateTaskDto[] = [];

      tasks.forEach((task: any) => {
        this.logger.debug(
          `Creating task: ${task.title}, ${task.description}, ${task.assignedTo}`,
        );

        const inputTask: CreateTaskDto = {
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          epicId: epic.id,
          companyId: company.id,
        };

        inputTasks.push(inputTask);
      });

      this.logger.debug(`Input tasks: ${JSON.stringify(inputTasks)}`);

      const createdTasks = await this.taskService.createTasks(inputTasks);

      this.logger.debug(`Created tasks: ${JSON.stringify(createdTasks)}`);

      // Asignamos las tareas a los usuarios
      if (autoAssign) {
        this.logger.log('Auto assigning tasks to users');
        const members = company.members;

        this.logger.debug(`Members: ${JSON.stringify(members)}`);

        const assignTaskByLlm = await this.iaService.executePrompt(
          `Eres un asistente experto en asignación de tareas. Tu objetivo es asignar tareas a los miembros del equipo de la manera más eficiente posible, basándote en sus habilidades y competencias.

          Instrucciones:
          1. Analiza las habilidades de cada miembro y el contenido de las tareas
          2. Asigna las tareas priorizando miembros con habilidades relevantes
          3. Intenta distribuir la carga de trabajo de manera equilibrada
          4. Si una tarea requiere una habilidad específica, prioriza miembros con esa habilidad
          5. Para tareas sin habilidades específicas, distribuye equitativamente

          La respuesta debe ser un array de objetos con el siguiente formato:
          {
            "taskId": "<Id de la tarea>",
            "userId": "<Id del usuario>",
            "reason": "<Explicación breve de por qué se asignó esta tarea a este usuario>"
          }

          Información disponible:
          - Miembros del equipo: ${JSON.stringify(
            members.map((member) => ({
              id: member.id,
              name: member.name,
              skills: member.skills.map((skill) => ({
                name: skill.name,
                rating: skill.rating,
              })),
            })),
          )}
          
          - Tareas a asignar: ${JSON.stringify(
            createdTasks.map((task) => ({
              id: task.id,
              title: task.title,
              description: task.description,
            })),
          )}
          
          - Reglas de negocio ${company.businessRules}`,
        );

        this.logger.debug(
          `Assigned tasks by LLM: ${JSON.stringify(assignTaskByLlm.data)}`,
        );

        const assignTaskByLlmData = assignTaskByLlm.data as any[];

        const assignedTasks =
          await this.taskService.assignTasksToUsers(assignTaskByLlmData);

        this.logger.debug(`Assigned tasks: ${JSON.stringify(assignedTasks)}`);
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
