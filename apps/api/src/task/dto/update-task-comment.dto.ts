import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateTaskCommentInput')
export class UpdateTaskCommentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  comment: string;
}
