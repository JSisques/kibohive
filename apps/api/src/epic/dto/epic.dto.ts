import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CompanyDto } from 'src/company/dto/company.dto';
import { TaskDto } from 'src/task/dto/task.dto';

@ObjectType('Epic')
export class EpicDto {
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
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @Field(() => CompanyDto, { nullable: true })
  @IsOptional()
  company?: CompanyDto;

  @Field()
  @IsOptional()
  @IsNumber()
  numberOfTasks?: number;

  @Field(() => [TaskDto], { nullable: true })
  @IsOptional()
  tasks?: TaskDto[];

  @Field()
  @IsOptional()
  @IsNumber()
  numberOfTaskCompleted?: number;

  @Field(() => [TaskDto], { nullable: true })
  @IsOptional()
  tasksCompleted?: TaskDto[];

  @Field()
  @IsOptional()
  @IsNumber()
  numberOfTaskPending?: number;

  @Field(() => [TaskDto], { nullable: true })
  @IsOptional()
  tasksPending?: TaskDto[];

  @Field()
  @IsOptional()
  @IsNumber()
  numberOfTaskInProgress?: number;

  @Field(() => [TaskDto], { nullable: true })
  @IsOptional()
  tasksInProgress?: TaskDto[];
}
