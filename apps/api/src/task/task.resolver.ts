import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';

@Resolver()
export class TaskResolver {
  private readonly logger;
  constructor(private readonly taskService: TaskService) {
    this.logger = new Logger(TaskResolver.name);
  }

  @Query(() => [TaskDto])
  async getTasks() {
    this.logger.log('Entering getTasks()');
    return this.taskService.getTasks();
  }

  @Query(() => TaskDto)
  async getTaskById(@Args('id') id: string) {
    this.logger.log(`Entering getTaskById(${id})`);
    return this.taskService.getTaskById(id);
  }

  @Query(() => [TaskDto])
  async getTasksByTeamId(@Args('teamId') teamId: string) {
    this.logger.log(`Entering getTasksByTeamId(${teamId})`);
    return this.taskService.getTasksByTeamId(teamId);
  }

  @Mutation(() => TaskDto)
  async createTask(@Args('input') createTaskDto: CreateTaskDto) {
    this.logger.log(`Entering createTask(${createTaskDto.title})`);
    return this.taskService.createTask(createTaskDto);
  }

  @Mutation(() => TaskDto)
  async updateTask(
    @Args('id') id: string,
    @Args('input') updateTaskDto: UpdateTaskDto,
  ) {
    this.logger.log(`Entering updateTask(${id})`);
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Mutation(() => TaskDto)
  async deleteTask(@Args('id') id: string) {
    this.logger.log(`Entering deleteTask(${id})`);
    return this.taskService.deleteTask(id);
  }
}
