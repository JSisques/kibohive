import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateEpic')
@InputType('UpdateEpicInput')
export class UpdateEpicDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // @Field(() => EpicStatus)
  // @IsEnum(EpicStatus)
  // status: EpicStatus;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
