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
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [UserDto], { nullable: true })
  members?: UserDto[];

  @Field(() => [EpicDto], { nullable: true })
  epics?: EpicDto[];

  @Field()
  @IsString()
  @IsNotEmpty()
  subdomain: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessRules?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
