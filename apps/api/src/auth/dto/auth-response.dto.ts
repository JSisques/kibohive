import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType()
export class AuthResponseDto {
  @Field(() => UserDto)
  user: UserDto;

  @Field()
  accessToken: string;
}
