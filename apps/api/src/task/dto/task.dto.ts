import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Priority, TaskStatus } from '@prisma/client';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Task')
export class TaskDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  //   @Field(() => TaskStatus)
  //   @IsOptional()
  //   @IsEnum(TaskStatus)
  //   status: TaskStatus;

  //   @Field(() => Priority)
  //   @IsOptional()
  //   @IsEnum(Priority)
  //   priority: Priority;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

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

  @Field(() => UserDto)
  @IsNotEmpty()
  @IsUUID()
  createdBy: UserDto;
}
