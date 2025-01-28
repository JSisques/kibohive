import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Logger } from '@nestjs/common';

@Resolver()
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
}
