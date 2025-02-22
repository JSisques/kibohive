import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
} from 'class-validator';
import { EpicDto } from 'src/epic/dto/epic.dto';
import { UserDto } from 'src/user/dto/user.dto';

@ObjectType('Company')
export class CompanyDto {
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  id?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  clerkId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [UserDto], { nullable: true })
  @IsOptional()
  members?: UserDto[];

  @Field(() => [EpicDto], { nullable: true })
  @IsOptional()
  epics?: EpicDto[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subdomain?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessRules?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
