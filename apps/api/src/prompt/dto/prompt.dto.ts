import { ObjectType, Field } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID, IsNotEmpty } from 'class-validator';

@ObjectType('Prompt')
export class PromptDto {
  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Date)
  @IsDate()
  createdAt: Date;

  @Field(() => Date)
  @IsDate()
  updatedAt: Date;
}
