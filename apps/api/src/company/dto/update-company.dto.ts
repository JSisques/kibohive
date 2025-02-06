import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType('UpdateCompany')
@InputType('UpdateCompanyInput')
export class UpdateCompanyDto {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  subdomain?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  businessRules?: string;
}
