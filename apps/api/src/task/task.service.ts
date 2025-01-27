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
    return this.prisma.task.findMany();
  }

  async getTaskById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async createOrGetTask(createTaskDto: CreateTaskDto) {
    const task = await this.prisma.task.findFirst({
      where: {
        title: createTaskDto.title,
      },
    });
    if (!task) {
      return this.prisma.task.create({
        data: createTaskDto,
      });
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
