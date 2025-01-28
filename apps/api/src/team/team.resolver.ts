import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Logger } from '@nestjs/common';

@Resolver()
export class TeamResolver {
  private readonly logger;
  constructor(private readonly teamService: TeamService) {
    this.logger = new Logger(TeamResolver.name);
  }

  @Query(() => [TeamDto])
  async getTeams(): Promise<TeamDto[]> {
    this.logger.log('Getting teams');
    return this.teamService.getTeams();
  }

  @Query(() => TeamDto)
  async getTeamById(@Args('id') id: string): Promise<TeamDto> {
    this.logger.log(`Getting team by id: ${id}`);
    return this.teamService.getTeamById(id);
  }

  @Mutation(() => TeamDto)
  async createTeam(@Args('input') input: CreateTeamDto): Promise<TeamDto> {
    this.logger.log(`Creating team: ${input.name}`);
    return this.teamService.createTeam(input);
  }

  @Mutation(() => TeamDto)
  async updateTeam(
    @Args('id') id: string,
    @Args('input') input: UpdateTeamDto,
  ): Promise<TeamDto> {
    this.logger.log(`Updating team: ${id}`);
    return this.teamService.updateTeam(id, input);
  }

  @Mutation(() => TeamDto)
  async deleteTeam(@Args('id') id: string): Promise<TeamDto> {
    this.logger.log(`Deleting team: ${id}`);
    return this.teamService.deleteTeam(id);
  }
}
