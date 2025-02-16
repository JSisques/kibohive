import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

@ObjectType('UpdateTeam')
@InputType('UpdateTeamInput')
export class UpdateTeamDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string;
}
