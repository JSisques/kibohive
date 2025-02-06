import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserSkillDto } from './user-skill.dto';
import { TaskDto } from 'src/task/dto/task.dto';

@ObjectType('User')
export class UserDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;

  @Field(() => [UserSkillDto], { nullable: true })
  skills?: UserSkillDto[];

  @Field(() => [TaskDto], { nullable: true })
  tasks?: TaskDto[];

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
