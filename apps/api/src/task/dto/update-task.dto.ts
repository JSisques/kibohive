import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateTask')
@InputType('UpdateTaskInput')
export class UpdateTaskDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;
}
