import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
import { TeamMemberDto } from './team-member.dto';

@ObjectType('Team')
export class TeamDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @Field(() => [TeamMemberDto])
  @IsNotEmpty()
  @IsArray()
  members: TeamMemberDto[];
}
