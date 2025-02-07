import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType('CreateUserQuery')
@InputType('CreateUserQueryInput')
export class CreateUserQueryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  userQuery: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  conversationHistory?: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  clerkCompanyId: string;
}
