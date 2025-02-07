import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectType } from '@nestjs/graphql';

@ObjectType('CreatePrompt')
@InputType('CreatePromptInput')
export class CreatePromptDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
}
