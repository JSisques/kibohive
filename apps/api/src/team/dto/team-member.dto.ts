import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('TeamMember')
export class TeamMemberDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  teamId: string;

  @Field(() => String)
  userId: string;

  @Field(() => UserDto)
  user: UserDto;
}
