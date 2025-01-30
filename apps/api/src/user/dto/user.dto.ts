import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@ObjectType('User')
export class UserDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsOptional()
  avatar?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
