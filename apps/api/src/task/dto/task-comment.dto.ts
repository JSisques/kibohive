import { Field, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/user/dto/user.dto';
import { IsString, IsNotEmpty, IsUUID, IsDate } from 'class-validator';

@ObjectType('TaskComment')
export class TaskCommentDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Field()
  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @Field(() => UserDto)
  @IsNotEmpty()
  user: UserDto;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  taskId: string;
}
