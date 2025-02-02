import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TaskService.name);
  }

  async getTasks() {
    this.logger.log('Entering getTasks()');
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string) {
    this.logger.log('Entering getTaskById()');
    return this.prisma.task.findUnique({
      where: { id },
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
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    this.logger.log(`Entering updateTask(${id})`);
    this.logger.debug(`Task data: ${JSON.stringify(updateTaskDto)}`);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: string) {
    this.logger.log(`Entering deleteTask(${id})`);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
