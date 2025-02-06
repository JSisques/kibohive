import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '@prisma/client';

@InputType()
export class UpdateTaskStatusDto {
  @Field(() => String)
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
