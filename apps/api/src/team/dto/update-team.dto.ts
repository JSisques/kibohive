import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateTeam')
@InputType('UpdateTeamInput')
export class UpdateTeamDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
