import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Priority, TaskStatus } from '@prisma/client';

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

  @Field(() => TaskStatus)
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Field(() => Priority)
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

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
