import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { EpicDto } from 'src/epic/dto/epic.dto';
import { TaskStatus } from '@prisma/client';
@ObjectType('Task')
export class TaskDto {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  epicId?: string;

  @Field(() => EpicDto, { nullable: true })
  @IsOptional()
  epic?: Partial<EpicDto>;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;

  @Field(() => UserDto, { nullable: true })
  @IsOptional()
  assignedTo?: UserDto;

  @Field(() => TaskStatus)
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
