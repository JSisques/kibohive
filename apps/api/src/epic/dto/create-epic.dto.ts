import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

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

  @Field()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;
}
