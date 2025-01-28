import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  private readonly logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TeamService.name);
  }

  async getTeams(): Promise<TeamDto[]> {
    this.logger.log(`Getting teams`);
    return this.prisma.team.findMany();
  }

  async getTeamById(id: string): Promise<TeamDto> {
    this.logger.log(`Getting team by id: ${id}`);
    return this.prisma.team.findUnique({ where: { id } });
  }

  async createTeam(input: CreateTeamDto): Promise<TeamDto> {
    this.logger.log(`Creating team: ${input.name}`);
    return this.prisma.team.create({ data: input });
  }

  async updateTeam(id: string, input: UpdateTeamDto): Promise<TeamDto> {
    this.logger.log(`Updating team: ${id}`);
    return this.prisma.team.update({ where: { id }, data: input });
  }

  async deleteTeam(id: string): Promise<TeamDto> {
    this.logger.log(`Deleting team: ${id}`);
    return this.prisma.team.delete({ where: { id } });
  }
}
