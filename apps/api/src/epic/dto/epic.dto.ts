import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
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

  @Field(() => [TaskDto], { nullable: true })
  @IsOptional()
  tasks?: TaskDto[];
}
