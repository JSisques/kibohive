import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Priority, TaskStatus } from '@prisma/client';

@ObjectType('CreateTask')
@InputType('CreateTaskInput')
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // @Field(() => TaskStatus, { nullable: true })
  // @IsOptional()
  // @IsEnum(TaskStatus)
  // status?: TaskStatus;

  // @Field(() => Priority)
  // @IsOptional()
  // @IsEnum(Priority)
  // priority?: Priority;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  teamId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  epicId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  createdById: string;
}
