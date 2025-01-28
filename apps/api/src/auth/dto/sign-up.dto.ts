import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsBoolean,
} from 'class-validator';

@ObjectType('SignUp')
@InputType('SignUpInput')
export class SignUpDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, {
    message:
      'El subdominio solo puede contener letras minúsculas, números y guiones',
  })
  @MinLength(3)
  subdomain: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  isNewCompany: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MinLength(3)
  companyName?: string;
}
