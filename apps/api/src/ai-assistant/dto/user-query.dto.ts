import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('UserQuery')
export class UserQueryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  response: string;
}
