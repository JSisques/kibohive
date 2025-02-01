import { InputType, Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@ObjectType('CreateUser')
@InputType('CreateUserInput')
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  companyId: string;
}
