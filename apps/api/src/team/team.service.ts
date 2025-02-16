import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
@Injectable()
export class TeamService {
  private readonly logger;

  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(TeamService.name);
  }

  async getTeams() {
    return this.prisma.team.findMany({});
  }

  async getTeamsByCompanyId(companyId: string) {
    return this.prisma.team.findMany({
      where: {
        companyId,
      },
    });
  }

  async getTeamById(teamId: string) {
    return this.prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });
  }

  async createTeam(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({
      data: createTeamDto,
    });
  }

  async updateTeam(teamId: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: {
        id: teamId,
      },
      data: updateTeamDto,
    });
  }

  async deleteTeam(teamId: string) {
    return this.prisma.team.delete({
      where: {
        id: teamId,
      },
    });
  }
}
