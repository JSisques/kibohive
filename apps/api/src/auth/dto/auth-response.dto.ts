import { Field, ObjectType } from '@nestjs/graphql';
import { CompanyDto } from 'src/company/dto/company.dto';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType()
export class AuthResponseDto {
  @Field(() => UserDto)
  user: UserDto;

  @Field()
  companySubdomain: string;
  @Field()
  accessToken: string;
}
