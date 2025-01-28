import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { EpicStatus } from '@prisma/client';

@ObjectType('CreateEpic')
@InputType('CreateEpicInput')
export class CreateEpicDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // @Field(() => EpicStatus, { nullable: true })
  // @IsOptional()
  // @IsEnum(EpicStatus)
  // status?: EpicStatus;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @Field()
  @IsNotEmpty()
  @IsUUID()
  teamId: string;
}
