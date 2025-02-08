import { IsString, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateTaskCommentInput')
export class CreateTaskCommentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
