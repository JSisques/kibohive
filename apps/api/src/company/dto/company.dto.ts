import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, IsDate } from 'class-validator';

@ObjectType('Company')
export class CompanyDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  subdomain: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
