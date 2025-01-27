import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';
import { InputType } from '@nestjs/graphql';

@InputType('UpdateTaskInput')
export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
