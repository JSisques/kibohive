import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsDate } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Company')
export class CompanyDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [UserDto], { nullable: true })
  members?: UserDto[];

  @Field()
  @IsString()
  @IsNotEmpty()
  subdomain: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
