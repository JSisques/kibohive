import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsDate } from 'class-validator';
import { TeamDto } from 'src/team/dto/team.dto';

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

  @Field(() => [TeamDto], { nullable: true })
  teams?: TeamDto[];

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
