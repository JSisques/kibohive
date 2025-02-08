import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from '@prisma/client';
import { TaskCommentDto } from './dto/task-comment.dto';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';
@Resolver(() => TaskDto)
export class TaskResolver {
  private readonly logger;
  constructor(private readonly taskService: TaskService) {
    this.logger = new Logger(TaskResolver.name);
  }

  @Query(() => [TaskDto])
  async getTasks(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    if (page && limit) {
      return this.taskService.getTasks({ page, limit });
    }
    return this.taskService.getTasks();
  }

  @Query(() => Int)
  async tasksCount() {
    return this.taskService.getTasksCount();
  }

  @Query(() => TaskDto)
  async getTaskById(@Args('id') id: string) {
    this.logger.log(`Entering getTaskById(${id})`);
    return this.taskService.getTaskById(id);
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

  @Mutation(() => TaskDto)
  async updateTaskStatus(
    @Args('id') id: string,
    @Args('input') updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    this.logger.log(
      `Entering updateTaskStatus resolver for task ${updateTaskStatusDto.status}`,
    );
    return this.taskService.updateTaskStatus(id, updateTaskStatusDto.status);
  }

  @Mutation(() => TaskCommentDto)
  async createTaskComment(
    @Args('input') createTaskCommentDto: CreateTaskCommentDto,
  ) {
    this.logger.log(
      `Entering createTaskComment(${createTaskCommentDto.comment})`,
    );
    return this.taskService.createTaskComment(createTaskCommentDto);
  }

  @Query(() => [TaskCommentDto])
  async getTaskComments(@Args('taskId') taskId: string) {
    this.logger.log(`Entering getTaskComments(${taskId})`);
    return this.taskService.getTaskComments(taskId);
  }

  @Mutation(() => TaskCommentDto)
  async updateTaskComment(
    @Args('id') id: string,
    @Args('input') updateTaskCommentDto: UpdateTaskCommentDto,
  ) {
    this.logger.log(`Entering updateTaskComment(${id})`);
    return this.taskService.updateTaskComment(id, updateTaskCommentDto);
  }

  @Mutation(() => TaskCommentDto)
  async deleteTaskComment(@Args('id') id: string) {
    this.logger.log(`Entering deleteTaskComment(${id})`);
    return this.taskService.deleteTaskComment(id);
  }
}
