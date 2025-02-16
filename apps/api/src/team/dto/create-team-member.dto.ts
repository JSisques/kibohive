import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType('CreateTeamMember')
@InputType('CreateTeamMemberInput')
export class CreateTeamMemberDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  teamId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  userId: string;
}
