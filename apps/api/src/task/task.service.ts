import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  async getTasksByTeamId(teamId: string) {
    this.logger.log(`Entering getTasksByTeamId(${teamId})`);
    return this.prisma.task.findMany({
      where: { teamId },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    this.logger.log(`Entering createTask(${createTaskDto.title})`);
    this.logger.debug(`Task data: ${JSON.stringify(createTaskDto)}`);
    return this.prisma.task.create({
      data: createTaskDto,
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
