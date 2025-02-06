import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  UserSkillDto,
  CreateUserSkillInput,
  UpdateUserSkillInput,
} from './dto/user-skill.dto';
import { Logger } from '@nestjs/common';

@Resolver(() => UserDto)
export class UserResolver {
  private readonly logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserResolver.name);
  }

  @Query(() => [UserDto])
  async getUsers(): Promise<UserDto[]> {
    this.logger.log('Entering getUsers()');
    return this.userService.getUsers();
  }

  @Query(() => UserDto)
  async getUserById(@Args('id') id: string): Promise<UserDto> {
    this.logger.log(`Entering getUserById(${id})`);
    return this.userService.getUserById(id);
  }

  @Query(() => UserDto)
  async getUserByClerkId(@Args('clerkId') clerkId: string): Promise<UserDto> {
    this.logger.log(`Entering getUserByClerkId(${clerkId})`);
    return this.userService.getUserByClerkId(clerkId);
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: CreateUserDto): Promise<UserDto> {
    this.logger.log(`Entering createUser(${input.email})`);
    return this.userService.createUser(input);
  }

  @Mutation(() => UserDto)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserDto,
  ): Promise<UserDto> {
    this.logger.log(`Entering updateUser(${id}, ${input})`);
    return this.userService.updateUser(id, input);
  }

  @Mutation(() => UserDto)
  async deleteUser(@Args('id') id: string): Promise<UserDto> {
    this.logger.log(`Entering deleteUser(${id})`);
    return this.userService.deleteUser(id);
  }

  @Query(() => [UserSkillDto])
  async getUserSkills(@Args('userId') userId: string) {
    return this.userService.getUserSkills(userId);
  }

  @Mutation(() => UserSkillDto)
  async addUserSkill(
    @Args('userId') userId: string,
    @Args('skill') skill: CreateUserSkillInput,
  ) {
    return this.userService.addUserSkill(userId, skill);
  }

  @Mutation(() => UserSkillDto)
  async updateUserSkill(
    @Args('userId') userId: string,
    @Args('skillId') skillId: string,
    @Args('skill') skill: UpdateUserSkillInput,
  ) {
    return this.userService.updateUserSkill(userId, skillId, skill);
  }

  @Mutation(() => UserSkillDto)
  async deleteUserSkill(
    @Args('userId') userId: string,
    @Args('skillId') skillId: string,
  ) {
    return this.userService.deleteUserSkill(userId, skillId);
  }
}
