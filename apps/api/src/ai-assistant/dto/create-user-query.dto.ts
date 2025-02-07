import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('CreateUserQuery')
@InputType('CreateUserQueryInput')
export class CreateUserQueryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userQuery: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  clerkCompanyId: string;
}
