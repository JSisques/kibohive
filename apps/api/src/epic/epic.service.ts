import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEpicDto } from './dto/create-epic.dto';
import { UpdateEpicDto } from './dto/update-epic.dto';
import { EpicDto } from './dto/epic.dto';

@Injectable()
export class EpicService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(EpicService.name);
  }

  async getEpics(): Promise<EpicDto[]> {
    this.logger.log('Getting all epics');
    return this.prisma.epic.findMany();
  }

  async getEpicById(id: string): Promise<EpicDto> {
    this.logger.log(`Getting epic by id: ${id}`);
    return this.prisma.epic.findUnique({ where: { id } });
  }

  async createEpic(epic: CreateEpicDto): Promise<EpicDto> {
    this.logger.log(`Creating epic: ${epic.title}`);
    return this.prisma.epic.create({ data: epic });
  }

  async updateEpic(id: string, epic: UpdateEpicDto): Promise<EpicDto> {
    this.logger.log(`Updating epic: ${id}`);
    return this.prisma.epic.update({ where: { id }, data: epic });
  }

  async deleteEpic(id: string): Promise<EpicDto> {
    this.logger.log(`Deleting epic: ${id}`);
    return this.prisma.epic.delete({ where: { id } });
  }
}
