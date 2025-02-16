import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Resolver()
export class TeamResolver {
  private readonly logger;
  constructor(private readonly teamService: TeamService) {
    this.logger = new Logger(TeamResolver.name);
  }

  @Query(() => [TeamDto])
  async getTeams() {
    return this.teamService.getTeams();
  }

  @Query(() => [TeamDto])
  async getTeamsByCompanyId(
    @Args('companyId', { type: () => String }) companyId: string,
  ) {
    return this.teamService.getTeamsByCompanyId(companyId);
  }

  @Query(() => TeamDto)
  async getTeamById(@Args('teamId', { type: () => String }) teamId: string) {
    return this.teamService.getTeamById(teamId);
  }

  @Mutation(() => TeamDto)
  async createTeam(
    @Args('createTeamDto', { type: () => CreateTeamDto })
    createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Mutation(() => TeamDto)
  async updateTeam(
    @Args('teamId', { type: () => String }) teamId: string,
    @Args('updateTeamDto', { type: () => UpdateTeamDto })
    updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Mutation(() => TeamDto)
  async deleteTeam(@Args('teamId', { type: () => String }) teamId: string) {
    return this.teamService.deleteTeam(teamId);
  }
}
