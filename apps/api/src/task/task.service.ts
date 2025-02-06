import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskDto } from './dto/task.dto';

interface AssignTaskData {
  taskId: string;
  userId: string;
  reason: string;
}

@Injectable()
export class TaskService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TaskService.name);
  }

  async getTasks() {
    this.logger.log('Entering getTasks()');
    return this.prisma.task.findMany({
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }

  async getTaskById(id: string) {
    this.logger.log('Entering getTaskById()');
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    this.logger.log(`Entering createTask(${createTaskDto.title})`);
    this.logger.debug(`Task data: ${JSON.stringify(createTaskDto)}`);

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description || '',
        status: TaskStatus.TODO,
        epic: {
          connect: {
            id: createTaskDto.epicId,
          },
        },
        assignedTo: createTaskDto.assignedToId
          ? {
              connect: {
                id: createTaskDto.assignedToId,
              },
            }
          : undefined,
      },
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }

  async createTasks(createTasksDto: CreateTaskDto[]) {
    this.logger.log(`Entering createTasks(${createTasksDto.length})`);
    this.logger.debug(`Tasks data: ${JSON.stringify(createTasksDto)}`);

    return await Promise.all(
      createTasksDto.map((task) => this.createTask(task)),
    );
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    this.logger.log(`Entering updateTask(${id})`);
    this.logger.debug(`Task data: ${JSON.stringify(updateTaskDto)}`);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }

  async deleteTask(id: string) {
    this.logger.log(`Entering deleteTask(${id})`);
    return this.prisma.task.delete({
      where: { id },
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }

  async assignTasksToUsers(assignTasks: AssignTaskData[]): Promise<TaskDto[]> {
    this.logger.log(`Assigning tasks to users: ${JSON.stringify(assignTasks)}`);

    const updatedTasks = await Promise.all(
      assignTasks.map(async (assignTask) => {
        return this.prisma.task.update({
          where: { id: assignTask.taskId },
          data: {
            assignedToId: assignTask.userId,
            assignmentReason: assignTask.reason,
          },
          include: {
            assignedTo: true,
            epic: true,
          },
        });
      }),
    );

    return updatedTasks;
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    this.logger.log(`Entering updateTaskStatus for task ${status}`);
    return this.prisma.task.update({
      where: { id },
      data: {
        status,
      },
      include: {
        epic: true,
        assignedTo: true,
      },
    });
  }
}
