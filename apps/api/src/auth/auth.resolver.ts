import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Resolver()
export class AuthResolver {
  private readonly logger;
  constructor(private readonly authService: AuthService) {
    this.logger = new Logger(AuthResolver.name);
  }

  @Query(() => Boolean)
  async isSubdomainAvailable(
    @Args('subdomain') subdomain: string,
  ): Promise<boolean> {
    this.logger.log(`Checking subdomain availability: ${subdomain}`);
    return this.authService.isSubdomainAvailable(subdomain);
  }

  @Mutation(() => UserDto)
  async signUp(@Args('input') input: SignUpDto): Promise<UserDto> {
    this.logger.log(`Entering signUp(${input.email})`);
    return this.authService.signUp(input);
  }

  @Mutation(() => UserDto)
  async signIn(@Args('input') input: SignInDto): Promise<UserDto> {
    this.logger.log(`Entering signIn(${input.email})`);
    return this.authService.signIn(input);
  }
}
