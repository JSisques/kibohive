import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { EpicDto } from './dto/epic.dto';
import { CompanyDto } from '../company/dto/company.dto';

@Injectable()
export class EpicService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(EpicService.name);
  }

  async getEpics(): Promise<EpicDto[]> {
    this.logger.log('Getting all epics');
    return this.prisma.epic.findMany({
      include: { company: true, tasks: true },
    });
  }

  async getEpicById(id: string): Promise<EpicDto> {
    this.logger.log(`Getting epic by id: ${id}`);
    return this.prisma.epic.findUnique({
      where: { id },
      include: { company: true, tasks: true },
    });
  }

  async createEpic(epic: CreateEpicDto): Promise<EpicDto> {
    this.logger.log(`Creating epic: ${epic.title}`);
    return this.prisma.epic.create({
      data: epic,
      include: { company: true, tasks: true },
    });
  }

  async updateEpic(id: string, epic: UpdateEpicDto): Promise<EpicDto> {
    this.logger.log(`Updating epic: ${id}`);
    return this.prisma.epic.update({
      where: { id },
      data: epic,
      include: { company: true, tasks: true },
    });
  }

  async deleteEpic(id: string): Promise<EpicDto> {
    this.logger.log(`Deleting epic: ${id}`);
    return this.prisma.epic.delete({
      where: { id },
      include: { company: true, tasks: true },
    });
  }
}
