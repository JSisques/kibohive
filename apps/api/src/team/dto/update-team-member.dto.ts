import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('UpdateTeamMember')
@InputType('UpdateTeamMemberInput')
export class UpdateTeamMemberDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  teamId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}
